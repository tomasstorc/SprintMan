"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_response_1 = __importDefault(require("../response/error-response"));
const AuthKey_1 = __importDefault(require("../model/AuthKey"));
const isAuthenticated = (req, res, next) => {
    if (req.body.key) {
        AuthKey_1.default.findOne({ key: req.body.key }, (err, foundKey) => {
            if (err) {
                console.log(err);
                return res.status(401).json(new error_response_1.default("unauthorized"));
            }
            if (!foundKey) {
                return res.status(403).json(new error_response_1.default("invalid key"));
            }
            req.skip = true;
            next();
        });
    }
    else {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (!token)
            return res.status(401).json(new error_response_1.default("unauthorized"));
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
                return res.status(403).json({ status: "error", errors: [err] });
            req.user = user;
            next();
        });
    }
};
exports.default = isAuthenticated;
