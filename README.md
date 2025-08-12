# Notes API

Simple RESTful Notes API built with Node.js, Express and MongoDB (Mongoose).  
Provides CRUD operations for creating, reading, updating and deleting notes.

---

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--run)
- [API Endpoints](#api-endpoints)
- [Error Handling Examples](#error-handling-examples)
- [Folder Structure](#folder-structure)
- [Testing](#testing)
- [Possible Improvements / Next Steps](#possible-improvements)
- [Author](#author)

---

## Live Demo

You can access the live API here:  
[Notes API on Render](https://notes-api-xjz0.onrender.com/api/notes)

---

## Features
- Create, read, update, delete notes
- Validations for required fields
- Proper HTTP status codes and JSON responses
- Clean controller/route separation and project structure

---

## Tech Stack
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose
- dotenv (for environment variables)
- nodemon (dev)
- body-parser

---

## Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account
- A code editor like VS Code
- Postman for API testing (optional but recommended)

---

## Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/notes-api.git
cd Notes_API (your-repo-name)
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=5000 (or PORT you set)
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm run start
```
- API server runs at http://localhost:5000 (or PORT you set)

---

## API Endpoints

Base path: `/api/notes`

### Create a Note
- **POST** `/api/notes`
- Body (JSON):
```json
{
  "title": "My first note",
  "content": "This is the note content."
}
```
- Success response: `201 Created`
```json
{
    "success": true,
    "message": "Note created successfullly",
    "note": {
        "title": "My first note",
        "content": "This is the note content.",
        "_id": "689b33dc2897cf90506bb5ab",
        "createdAt": "2025-08-12T12:30:20.085Z",
        "updatedAt": "2025-08-12T12:30:20.085Z",
        "__v": 0
    }
}
```

### Get All Notes
- **GET** `/api/notes`
- Success response: `200 OK`
```json
{
  "success": true,
  "message": " All notes fetched successfully ",
  "notes": [
    { "_id": "...", "title": "...", "content": "...", "createdAt": "...", "updatedAt": "...", "__v": "..." }
  ]
}
```

### Get One Note
- **GET** `/api/notes/:id`
- If found: `200 OK` with message and note object
- If not found: `404 Not Found` 
```json
{ "success": false, "message": "Note not found" }
```

### Update Note
- **PUT** `/api/notes/:id`
- Body: fields to update (title and/or content)
- If success: `200 OK` with message and updated note
- If not found: `404 Not Found`

### Delete Note
- **DELETE** `/api/notes/:id`
- If success: `200 OK` with a message
- If not found: `404 Not Found`

---

## Error Handling Examples
- Missing required fields (POST):
  - Status: `400 Bad Request`
  - Body:
  ```json
  { "success": false, "message": "Title and content are required" }
  ```

- Server error:
  - Status: `500 Internal Server Error`
  - Body:
  ```json
  { "success": false, "message": "Internal Server Error" }
  ```

---

## Folder Structure
```
backend/
├── server.js
├── config/
│   └── db.js
├── controllers/
│   └── NotesController.js
├── models/
│   └── Note.js
├── routes/
│   └── NoteRoute.js
├── .env
├── .gitignore
└── README.md
```

---

## Testing
- Use Postman / Thunder Client to test each endpoint.
- Test cases to try:
  - Create a note with valid data → expect `201`
  - Create a note missing title → expect `400`
  - Get a note with non-existing ID → expect `404`
  - Update a note with valid ID → expect `200`
  - Delete a note with valid ID → expect `200`

---

## Possible Improvements / Next Steps
- Add authentication (JWT) so users have private notes
- Add pagination & sorting support on `GET /api/notes`
- Add unit/integration tests (Jest + Supertest)
- Add file attachments (images) using `multer`
- Deploy to Render / Railway / Heroku

---

## Author
Your Name — Satyam Garg (satyamgarg1672001@gmail.com)  

---



