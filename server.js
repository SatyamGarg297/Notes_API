const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json()); // req.body

// Import the router files
const NotesRoutes = require("./routes/NoteRoute");

// use the routers
app.use("/api/notes", NotesRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error", err));
