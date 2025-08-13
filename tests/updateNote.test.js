const { updateNote } = require("../controllers/NotesController");
const Note = require("../models/Note");

// Mock the Mongoose model methods
jest.mock("../models/Note");

// Helper function to simulate req and res objects
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("updateNote Controller", () => {
  it("should update a note and return success", async () => {
    const req = {
      params: { id: "123" },
      body: { title: "Updated title" }
    };
    const res = mockResponse();

    // Mock successful update
    const mockUpdatedNote = { _id: "123", title: "Updated title" };
    Note.findByIdAndUpdate.mockResolvedValue(mockUpdatedNote);

    await updateNote(req, res);

    expect(Note.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      { title: "Updated title" },
      { new: true, runValidators: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Note is updated successfully",
      note: mockUpdatedNote
    });
  });

  it("should return 404 if note not found", async () => {
    const req = { params: { id: "123" }, body: {} };
    const res = mockResponse();

    Note.findByIdAndUpdate.mockResolvedValue(null);

    await updateNote(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Note not found"
    });
  });

  it("should return 500 on server error", async () => {
    const req = { params: { id: "123" }, body: {} };
    const res = mockResponse();

    Note.findByIdAndUpdate.mockRejectedValue(new Error("DB error"));

    await updateNote(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal Server Error"
    });
  });
});
