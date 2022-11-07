"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = __importDefault(require("../response/error-response"));
const isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next();
    }
    else {
        return res.status(401).json(new error_response_1.default("unauthorized"));
    }
};
exports.default = isAdmin;
