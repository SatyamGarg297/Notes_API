const { deleteNote } = require('../controllers/NotesController');
const Note = require('../models/Note');

jest.mock('../models/Note'); // Mock Note model

// helper to mock req, res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('deleteNote Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a note and return 200 if note exists', async () => {
    const req = { params: { id: '123' } };
    const res = mockResponse();

    const fakeNote = { _id: '123', title: 'Test Note' };
    Note.findByIdAndDelete.mockResolvedValue(fakeNote);

    await deleteNote(req, res);

    expect(Note.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'note deleted successfully',
      deletedNote: fakeNote
    });
  });

  it('should return 404 if note not found', async () => {
    const req = { params: { id: '123' } };
    const res = mockResponse();

    Note.findByIdAndDelete.mockResolvedValue(null);

    await deleteNote(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Note not found'
    });
  });

  it('should return 500 on internal server error', async () => {
    const req = { params: { id: '123' } };
    const res = mockResponse();

    Note.findByIdAndDelete.mockRejectedValue(new Error('DB error'));

    await deleteNote(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal Server Error'
    });
  });
});
