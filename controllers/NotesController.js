const Note = require("../models/Note");

// Create a notes
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const newNote = new Note({ title, content });

    const saveNote = await newNote.save();
    console.log("Note has been saved");
    res.status(201).json({
      success: true,
      message: "Note created successfullly",
      note: saveNote,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all notes
const getAllNote = async (req, res) => {
  try {
    const Notes = await Note.find().sort({ createdAt: -1 }); //the most recent notes first
    res.status(200).json({
      success: true,
      message: " All notes fetched successfully ",
      notes: Notes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get the single note
const getSingleNote = async (req, res) => {
  try {
    const noteId = req.params.id; // Extract the note ID
    const singleNote = await Note.findById(noteId); // Find note by ID

    // If note doesn't exist
    if (!singleNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Single note fetched successfully",
      note: singleNote,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update a note by ID
const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id; // Extract the id
    const updatedNoteData = req.body; // updated data for the Note

    const updatedNote = await Note.findByIdAndUpdate(noteId, updatedNoteData, {
      new: true, // return the updated document
      runValidators: true, // Run Mongoose validation
    });

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    console.log("Note updated successfully");
    res.status(200).json({
      success: true,
      message: "Note is updated successfully",
      note: updatedNote,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Delete a note by ID
const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found" });
    }

    console.log("note deleted successfully");
    res
      .status(200)
      .json({
        success: true,
        message: "note deleted successfully",
        deletedNote,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createNote, getAllNote, getSingleNote, updateNote, deleteNote };
