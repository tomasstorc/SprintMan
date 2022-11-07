"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validate_email_1 = __importDefault(require("../utils/validate-email"));
const validate_password_1 = __importDefault(require("../utils/validate-password"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Email address is required"],
        validate: [validate_email_1.default, "Email is not valid"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [3, "Nmae must be atleast 3 characters long"],
        max: [30, "Maximux characters exceeded"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: [validate_password_1.default, "Password did not meet minimum requirements"],
    },
    role: {
        type: String,
        enum: {
            values: ["student", "editor", "admin"],
            message: `{VALUE} is not valid, must be studnet, admin. or editor`,
        },
    },
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
