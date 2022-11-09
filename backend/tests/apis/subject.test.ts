import request from "supertest";
import ISubject from "../../interface/subject";
import app from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import IUser from "../../interface/user";
import { send } from "process";

dotenv.config();
describe("Subject API test", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
  });
  afterEach(async () => {
    await mongoose.connection.close();
  });

  let token: string;
  let subjectId: string;
  test("login", async () => {
    let loginCreds = {
      email: "tomas.storc@gmail.com",
      password: process.env.TEST_PW,
    };
    const res = await request(app).post("/api/auth/login").send(loginCreds);
    token = res.body.data;
    expect(res.body).toHaveProperty("data");
  });
  it("create new subject", async () => {
    let subjectTest: ISubject = {
      name: "Test subject",
      goal: "this is a goal",
      language: "czech",
      degree: "Bc.",
      teacher: "Jan Novy",
      supervisor: "Petr Maly",
      credits: 5,
    };
    const res = await request(app)
      .post("/api/subject")
      .set("Authorization", `Bearer ${token}`)
      .send(subjectTest);

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
  });
});
