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
const Subject_1 = __importDefault(require("../../model/Subject"));
jest.setTimeout(10000);
describe("Add new subject", () => {
    test("Valid subject", () => __awaiter(void 0, void 0, void 0, function* () {
        const newSubject = {
            name: "Test subject",
            credits: 6,
            teacher: "Jan Novy",
            supervisor: "Pepa Maly",
            goal: "teach new things",
            language: "czech",
            degree: "Bc.",
        };
        const subjectSave = new Subject_1.default(newSubject);
        const res = yield subjectSave.save();
        expect(res.name).toBe(newSubject.name);
    }));
});
