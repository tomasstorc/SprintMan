"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authKeySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.authKeySchema = new mongoose_1.default.Schema({
    key: {
        type: String,
        required: true,
    },
});
const AuthKey = mongoose_1.default.model("AuthKey", exports.authKeySchema);
exports.default = AuthKey;
