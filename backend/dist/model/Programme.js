"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const programmeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [3, "Name must be atleast 3 characters long"],
        max: [30, "Maximum length for name exceeded"],
    },
    description: {
        type: String,
        required: [true, "Goal is required"],
        min: [3, "Description must be atleast 3 characters long"],
        max: [1000, "Maximum length for description exceeded"],
    },
    degree: {
        type: String,
        enum: {
            values: ["Bc.", "Msc."],
            message: `{VALUE} is not valid, must be Bc. or Msc.`,
        },
    },
    language: {
        type: String,
        enum: {
            values: ["czech", "english"],
            message: `{VALUE} is not valid, must be czech or english`,
        },
    },
    length: {
        type: Number,
        required: [true, "Length is reqired"],
        min: [3, "Minimum Length is 3"],
        max: [6, "Maximnum length is 6"],
    },
    osubjects: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Subject" }],
    ssubjects: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Subject" }],
    ossubjects: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Subject" }],
});
const Programme = mongoose_1.default.model("Programme", programmeSchema);
exports.default = Programme;
