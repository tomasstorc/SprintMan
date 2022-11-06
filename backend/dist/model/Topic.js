"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const DigitalContent_1 = require("./DigitalContent");
exports.topicSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [3, "Name must be at least 3 characters long"],
        max: [30, "Maximum length for name exceeded"],
    },
    materials: [DigitalContent_1.digitalContentSchema],
});
const Topic = mongoose_1.default.model("Topic", exports.topicSchema);
exports.default = Topic;
