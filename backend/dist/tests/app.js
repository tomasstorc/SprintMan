"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controller/auth-controller"));
const subject_controller_1 = __importDefault(require("../controller/subject-controller"));
const programme_controller_1 = __importDefault(require("../controller/programme-controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_controller_1.default);
app.use("/api/programme", programme_controller_1.default);
app.use("/api/subject", subject_controller_1.default);
exports.default = app;
