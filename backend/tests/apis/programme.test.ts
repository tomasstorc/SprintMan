import request from "supertest";
import IProgramme from "../../interface/programme";
import app from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import IUser from "../../interface/user";

dotenv.config();
jest.setTimeout(50000);

describe("test study programme API", () => {
  beforeEach(async () => {
    await mongoose.connect(process.env.DB_URL);
  });
  afterEach(async () => {
    await mongoose.connection.close();
  });

  let token: string;
  let programmeId: string;
  test("login", async () => {
    let loginCreds = {
      email: "tomas.storc@gmail.com",
      password: process.env.TEST_PW,
    };
    const res = await request(app).post("/api/auth/login").send(loginCreds);
    token = res.body.data;
    expect(res.body).toHaveProperty("data");
  });
  test("create new programme", async () => {
    let newProgramme = {
      name: "Test study programme",
      description: "this is a new study programme",
      language: "czech",
      degree: "Ing.",
      length: 3,
    };
    const res = await request(app)
      .post("/api/programme")
      .set("Authorization", `Bearer ${token}`)
      .send(newProgramme);

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
  });
});
