"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validate_url_1 = __importDefault(require("../utils/validate-url"));
const digitalContentSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [3, " Name must be atleast 3 characters long"],
        max: [30, "Maximum cagaracters exceeded"],
    },
    link: {
        type: String,
        validate: [validate_url_1.default, "Invalid link provided"],
    },
});
const DigitalContent = mongoose_1.default.model("DigitalContent", digitalContentSchema);
exports.default = DigitalContent;
