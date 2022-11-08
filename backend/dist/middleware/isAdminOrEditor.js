"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_response_1 = __importDefault(require("../response/error-response"));
const isAdminOrEditor = (req, res, next) => {
    var _a, _b;
    if (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role) === "admin" || ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.role) === "editor") {
        next();
    }
    else {
        return res.status(401).json(new error_response_1.default("unauthorized"));
    }
};
exports.default = isAdminOrEditor;
