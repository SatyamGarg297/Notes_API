const express = require("express");
const router = express.Router();
const {createNote, getAllNote, getSingleNote, updateNote, deleteNote} = require('../controllers/NotesController');

// make sure you put static routes before dynamic ones in the router file

router.post("/", createNote); // static
router.get("/", getAllNote);
router.get("/:id", getSingleNote);  // dynamic
router.put("/:id", updateNote );
router.delete("/:id", deleteNote);

module.exports = router;