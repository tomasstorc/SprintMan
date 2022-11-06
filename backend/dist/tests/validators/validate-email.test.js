"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_email_1 = __importDefault(require("../../utils/validate-email"));
describe("email validation", () => {
    test("correct email address", () => {
        expect((0, validate_email_1.default)("tomas.storc@gmail.com")).toBe(true);
    });
    test("invalid email address", () => {
        expect((0, validate_email_1.default)("tomas@ffd.c")).toBe(false);
    });
});
