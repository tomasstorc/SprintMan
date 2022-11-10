import request from "supertest";
import IProgramme from "../../interface/programme";
import ISubject from "../../interface/subject";
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

    programmeId = res.body.data._id;

    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
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

    subjectId = res.body.data._id;
    expect(res.statusCode).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
  });

  test("add subject to programme - osubject", async () => {
    let subjects = {
      ids: [subjectId],
    };

    const res = await request(app)
      .post(`/api/programme/${programmeId}/osubject`)
      .set("Authorization", `Bearer ${token}`)
      .send(subjects);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.osubjects).toHaveLength(1);
  });

  test("add subject to programme - ssubject", async () => {
    let subjects = {
      ids: [subjectId],
    };

    const res = await request(app)
      .post(`/api/programme/${programmeId}/ssubject`)
      .set("Authorization", `Bearer ${token}`)
      .send(subjects);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.ssubjects).toHaveLength(1);
  });

  test("add subject to programme - ossubject", async () => {
    let subjects = {
      ids: [subjectId],
    };

    const res = await request(app)
      .post(`/api/programme/${programmeId}/ossubject`)
      .set("Authorization", `Bearer ${token}`)
      .send(subjects);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.ossubjects).toHaveLength(1);
  });

  test("delete subject from programme - ossubject", async () => {
    let subjects = {
      ids: [subjectId],
    };

    const res = await request(app)
      .delete(`/api/programme/${programmeId}/ossubject`)
      .set("Authorization", `Bearer ${token}`)
      .send(subjects);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.ossubjects).toHaveLength(0);
  });

  test("delete subject from programme - ssubject", async () => {
    let subjects = {
      ids: [subjectId],
    };

    const res = await request(app)
      .delete(`/api/programme/${programmeId}/ssubject`)
      .set("Authorization", `Bearer ${token}`)
      .send(subjects);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.ossubjects).toHaveLength(0);
  });

  test("delete subject from programme - osubject", async () => {
    let subjects = {
      ids: [subjectId],
    };

    const res = await request(app)
      .delete(`/api/programme/${programmeId}/osubject`)
      .set("Authorization", `Bearer ${token}`)
      .send(subjects);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.ossubjects).toHaveLength(0);
  });
  test("delete created programme", async () => {
    const res = await request(app)
      .delete(`/api/programme/${programmeId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  test("delete created subject", async () => {
    const res = await request(app)
      .delete(`/api/programme/${subjectId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
