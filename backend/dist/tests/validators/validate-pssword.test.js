"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_password_1 = __importDefault(require("../../utils/validate-password"));
describe("validate password", () => {
    test("correct password", () => {
        expect((0, validate_password_1.default)("Asdf009,PW")).toBeTruthy();
    });
    test("invalid password", () => {
        expect((0, validate_password_1.default)("hello")).toBeFalsy();
    });
});
