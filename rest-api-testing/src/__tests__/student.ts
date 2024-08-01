import supertest from "supertest";
import createServer from "../server";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

const app = createServer();

const studentData = {
  name: "Safa",
  email: "safa@gmail",
  age: 22,
};

describe("Student", () => {
  beforeAll(async () => {
    const mongodbMemoryServer = await MongoMemoryServer.create();
    const uri = mongodbMemoryServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("GET a single student", () => {
    it("Should return 404 for an unknown email", async () => {
      const email = `test@gmail.com`;
      await supertest(app).get(`/api/v1/student/${email}`).expect(404);
    });
  });

  describe("POST a new student", () => {
    it("Should create a new student", async () => {
      await supertest(app)
        .post("/api/v1/student")
        .send(studentData)
        .expect(201);
    });
  });
});
