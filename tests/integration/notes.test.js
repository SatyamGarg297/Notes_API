// basic integration testing

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Note = require("../../models/Note");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Note.deleteMany();
});

describe("Notes API Integration Tests", () => {

  it("POST /api/notes - should create a note", async () => {
    const res = await request(app)
      .post("/api/notes")
      .send({ title: "Test Note", content: "Content" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.note.title).toBe("Test Note");
  });

  it("GET /api/notes/:id - should get a note by ID", async () => {
    const note = await Note.create({ title: "Note 1", content: "Content 1" });

    const res = await request(app).get(`/api/notes/${note._id}`);

    expect(res.status).toBe(200);
    expect(res.body.note.title).toBe("Note 1");
  });

  it("DELETE /api/notes/:id - should delete a note", async () => {
    const note = await Note.create({ title: "Delete Me", content: "Content" });

    const res = await request(app).delete(`/api/notes/${note._id}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);

    const found = await Note.findById(note._id);
    expect(found).toBeNull();
  });

});
