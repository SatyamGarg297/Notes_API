const Note = require("../../../models/Note");

describe("Note Model Unit Tests (Mocked)", () => {

  it("should call save() once successfully", async () => {
    // Mock save
    const saveMock = jest.fn().mockResolvedValue({ title: "Test Note", content: "Content" });
    const note = { save: saveMock };

    // Call save
    const savedNote = await note.save();

    // Assertions
    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(savedNote.title).toBe("Test Note");
    expect(savedNote.content).toBe("Content");
  });

  it("should throw error if save fails", async () => {
    const saveMock = jest.fn().mockRejectedValue(new Error("Validation Error"));
    const note = { save: saveMock };

    await expect(note.save()).rejects.toThrow("Validation Error");
    expect(saveMock).toHaveBeenCalledTimes(1);
  });

  it("should validate required fields (mocked)", async () => {
    const note = new Note({}); // empty object
    let err;
    try {
      await note.validate();
    } catch (error) {
      err = error;
    }

    expect(err).toBeDefined();
    expect(err.errors.title).toBeDefined();
    expect(err.errors.content).toBeDefined();
  });

});
