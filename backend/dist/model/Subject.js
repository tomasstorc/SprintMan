"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Topic_1 = require("./Topic");
const DigitalContent_1 = require("./DigitalContent");
const subjectSchema = new mongoose_1.default.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    min: [3, "Name must be atleast 3 characters long"],
    max: [30, "Maximum length for name exceeded"],
  },
  credits: {
    type: Number,
    required: [true, "credits are required"],
    min: [1, "Minimum number of credits is 1"],
    max: [12, "Maximum number of credits is 12"],
  },
  language: {
    type: String,
    enum: {
      values: ["czech", "english"],
      message: `{VALUE} is not valid, must be czech or english`,
    },
  },
  degree: {
    type: String,
    enum: {
      values: ["Bc.", "Ing."],
      message: `{VALUE} is not valid, must be Bc. or Ing.`,
    },
  },
  supervisor: {
    type: String,
    required: [true, "Supervisor name is required"],
    min: [3, "Supervisor name must be atleast 3 characters long"],
    max: [30, "Maximum length for supervisor name exceeded"],
  },
  teacher: {
    type: String,
    required: [true, "Teacher name is required"],
    min: [3, "Teacher name must be atleast 3 characters long"],
    max: [30, "Maximum length for teacher name exceeded"],
  },
  goal: {
    type: String,
    required: [true, "Goal is required"],
    min: [3, "Goal must be atleast 3 characters long"],
    max: [1000, "Maximum length for goal exceeded"],
  },
  materials: [DigitalContent_1.digitalContentSchema],
  topics: [Topic_1.topicSchema],
});
const Subject = mongoose_1.default.model("Subject", subjectSchema);
exports.default = Subject;
