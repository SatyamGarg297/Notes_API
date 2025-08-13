// tests/getAllNote.test.js
const { getAllNote } = require('../../../controllers/NotesController');
const Note = require('../../../models/Note');

// Mock the Note model so no real DB calls happen
jest.mock('../../../models/Note');

describe('getAllNote Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  test('should return all notes successfully', async () => {
    const mockNotes = [
      { title: 'Note 1', content: 'Content 1' },
      { title: 'Note 2', content: 'Content 2' }
    ];

    Note.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockNotes)
    });

    await getAllNote(req, res);

    expect(Note.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: " All notes fetched successfully ",
      notes: mockNotes
    });
  });

  test('should return empty array if no notes found', async () => {
    Note.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue([])
    });

    await getAllNote(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: " All notes fetched successfully ",
      notes: []
    });
  });

  test('should handle database errors', async () => {
    Note.find.mockReturnValue({
      sort: jest.fn().mockRejectedValue(new Error('DB error'))
    });

    await getAllNote(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Internal Server Error"
    });
  });
});
