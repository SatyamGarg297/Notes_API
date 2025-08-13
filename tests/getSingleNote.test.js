// Import the controller and dependencies
const { getSingleNote } = require('../controllers/NotesController');
const Note = require('../models/Note');

// Mock the Note model
jest.mock('../models/Note');

describe('getSingleNote Controller', () => {
  let req, res;

  beforeEach(() => {
    // Mock req and res objects
    req = { params: { id: 'mockId123' } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  test('should return 200 and the note when found', async () => {
    // Arrange
    const mockNote = { _id: 'mockId123', title: 'Test Note', content: 'Test Content' };
    Note.findById.mockResolvedValue(mockNote);

    // Act
    await getSingleNote(req, res);

    // Assert
    expect(Note.findById).toHaveBeenCalledWith('mockId123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: "Single note fetched successfully",
      note: mockNote
    });
  });

  test('should return 404 if note is not found', async () => {
    Note.findById.mockResolvedValue(null);

    await getSingleNote(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Note not found",
    });
  });

  test('should return 500 if an error occurs', async () => {
    Note.findById.mockRejectedValue(new Error('DB Error'));

    await getSingleNote(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: "Internal Server Error",
    });
  });
});
