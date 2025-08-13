// jest.mock('../models/Note');
// const Note = require("../models/Note");
// const { createNote } = require("../controllers/NotesController");

// describe("Note Controller - createNote", () => {
//   afterEach(() => jest.clearAllMocks());

//   it("should create and return a note when data is valid", async () => {
//     const req = {
//       body: { title: "Test Note", content: "Content here" },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };

//     await createNote(req, res);

//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       message: "Note created successfullly",
//       note: expect.objectContaining({
//         title: "Test Note",
//         content: "Content here",
//       }),
//     });
//   });
// });


// noteController.test.js
const { createNote } = require('../controllers/NotesController');
const Note = require('../models/Note');

describe('createNote Controller', () => {
  let req, res, saveMock;

  beforeEach(() => {
    // Mock Express req and res objects
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock Note.prototype.save (since you do new Note() then save)
    saveMock = jest.fn();

    // Spy on Note constructor to replace .save with our mock
    jest.spyOn(Note.prototype, 'save').mockImplementation(saveMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 400 if title or content missing', async () => {
    req.body = { title: '', content: '' };

    await createNote(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Title and content are required',
    });
    expect(saveMock).not.toHaveBeenCalled();
  });

  it('should save note and return 201 when data is valid', async () => {
    const fakeNote = { _id: 'noteId123', title: 'Test', content: 'Content' };
    req.body = { title: 'Test', content: 'Content' };

    saveMock.mockResolvedValue(fakeNote);

    await createNote(req, res);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Note created successfullly',
      note: fakeNote,
    });
  });

  it('should return 500 on exception', async () => {
    req.body = { title: 'Test', content: 'Content' };

    saveMock.mockRejectedValue(new Error('DB failure'));

    await createNote(req, res);

    expect(saveMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});

