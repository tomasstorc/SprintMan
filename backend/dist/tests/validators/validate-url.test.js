"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_url_1 = __importDefault(require("../../utils/validate-url"));
describe("url validator", () => {
    test("valid url", () => {
        expect((0, validate_url_1.default)("https://google.com")).toBeTruthy();
    });
    test("invalid url", () => {
        expect((0, validate_url_1.default)("notvalid")).toBeFalsy();
    });
});
