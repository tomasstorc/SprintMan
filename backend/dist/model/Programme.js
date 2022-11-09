"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_url_1 = __importDefault(require("../utils/validate-url"));
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
            values: ["Bc.", "Ing."],
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
        min: [2, "Minimum Length is 2"],
        max: [3, "Maximnum length is 3"],
    },
    imageUrl: {
        type: String,
        validate: [validate_url_1.default, "invalid URL"],
    },
    icon: {
        type: String,
        default: "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school-1.png",
    },
    osubjects: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Subject" }],
    ssubjects: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Subject" }],
    ossubjects: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Subject" }],
});
const Programme = mongoose_1.default.model("Programme", programmeSchema);
exports.default = Programme;
