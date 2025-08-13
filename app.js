// app.js
const express = require("express");
const bodyParser = require("body-parser");

// Import routes
const NotesRoutes = require("./routes/NoteRoute");

const app = express();

// Middleware
app.use(bodyParser.json());  // req.body

// Routes
app.use("/api/notes", NotesRoutes);

module.exports = app; // export app for testing

