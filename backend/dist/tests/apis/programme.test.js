"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
jest.setTimeout(50000);
describe("test study programme API", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.DB_URL);
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.connection.close();
    }));
    let token;
    let programmeId;
    let subjectId;
    test("login", () => __awaiter(void 0, void 0, void 0, function* () {
        let loginCreds = {
            email: "tomas.storc@gmail.com",
            password: process.env.TEST_PW,
        };
        const res = yield (0, supertest_1.default)(app_1.default).post("/api/auth/login").send(loginCreds);
        token = res.body.data;
        expect(res.body).toHaveProperty("data");
    }));
    test("create new programme", () => __awaiter(void 0, void 0, void 0, function* () {
        let newProgramme = {
            name: "Test study programme",
            description: "this is a new study programme",
            language: "czech",
            degree: "Ing.",
            length: 3,
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/programme")
            .set("Authorization", `Bearer ${token}`)
            .send(newProgramme);
        programmeId = res.body.data._id;
        expect(res.statusCode).toBe(201);
        expect(res.body.data).toHaveProperty("_id");
    }));
    it("create new subject", () => __awaiter(void 0, void 0, void 0, function* () {
        let subjectTest = {
            name: "Test subject",
            goal: "this is a goal",
            language: "czech",
            degree: "Bc.",
            teacher: "Jan Novy",
            supervisor: "Petr Maly",
            credits: 5,
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/api/subject")
            .set("Authorization", `Bearer ${token}`)
            .send(subjectTest);
        subjectId = res.body.data._id;
        expect(res.statusCode).toBe(201);
        expect(res.body.data).toHaveProperty("_id");
    }));
    test("add subject to programme - osubject", () => __awaiter(void 0, void 0, void 0, function* () {
        let subjects = {
            ids: [subjectId],
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/programme/${programmeId}/osubject`)
            .set("Authorization", `Bearer ${token}`)
            .send(subjects);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.osubjects).toHaveLength(1);
    }));
    test("add subject to programme - ssubject", () => __awaiter(void 0, void 0, void 0, function* () {
        let subjects = {
            ids: [subjectId],
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/programme/${programmeId}/ssubject`)
            .set("Authorization", `Bearer ${token}`)
            .send(subjects);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.ssubjects).toHaveLength(1);
    }));
    test("add subject to programme - ossubject", () => __awaiter(void 0, void 0, void 0, function* () {
        let subjects = {
            ids: [subjectId],
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .post(`/api/programme/${programmeId}/ossubject`)
            .set("Authorization", `Bearer ${token}`)
            .send(subjects);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.ossubjects).toHaveLength(1);
    }));
    test("delete subject from programme - ossubject", () => __awaiter(void 0, void 0, void 0, function* () {
        let subjects = {
            ids: [subjectId],
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/programme/${programmeId}/ossubject`)
            .set("Authorization", `Bearer ${token}`)
            .send(subjects);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.ossubjects).toHaveLength(0);
    }));
    test("delete subject from programme - ssubject", () => __awaiter(void 0, void 0, void 0, function* () {
        let subjects = {
            ids: [subjectId],
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/programme/${programmeId}/ssubject`)
            .set("Authorization", `Bearer ${token}`)
            .send(subjects);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.ossubjects).toHaveLength(0);
    }));
    test("delete subject from programme - osubject", () => __awaiter(void 0, void 0, void 0, function* () {
        let subjects = {
            ids: [subjectId],
        };
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/programme/${programmeId}/osubject`)
            .set("Authorization", `Bearer ${token}`)
            .send(subjects);
        expect(res.statusCode).toBe(200);
        expect(res.body.data.ossubjects).toHaveLength(0);
    }));
    test("delete created programme", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/programme/${programmeId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    }));
    test("delete created subject", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .delete(`/api/programme/${subjectId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(204);
    }));
});
