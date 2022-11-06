"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicScheme = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.topicScheme = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        min: [3, "Name must be at least 3 characters long"],
        max: [30, "Maximum length for name exceeded"],
    },
    materials: [{ Type: mongoose_1.default.Schema.Types.ObjectId, ref: "DigitalContent" }],
});
const Topic = mongoose_1.default.model("Topic", exports.topicScheme);
exports.default = Topic;
