"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const validate_password_1 = __importDefault(require("../utils/validate-password"));
const router = express_1.default.Router();
router.post("/register", (req, res) => {
    const body = req.body;
    console.log(req.body);
    if (!(0, validate_password_1.default)(body.password)) {
        return res.status(400).json({
            status: "error",
            errors: ["password did not meet minimum requirements"],
        });
    }
    if (!(body.username || body.password || body.role || body.name)) {
        res
            .status(400)
            .json({ status: "error", errors: ["uSome fields are missing"] });
    }
    else {
        User_1.default.findOne({ email: body.email }, (err, foundUser) => {
            if (foundUser) {
                res
                    .status(400)
                    .json({ status: "error", errors: ["username already exists"] });
            }
            else if (err) {
                res.status(400).json({ status: "error", errors: [err] });
            }
            else {
                bcrypt_1.default.hash(body.password, 10, (err, hash) => {
                    if (err)
                        res.status(400).json({ status: "error", errors: [err] });
                    const user = new User_1.default({
                        email: body.email,
                        name: body.name,
                        password: hash,
                        role: body.role,
                    });
                    user.save();
                    res.status(200).json({ status: "user created", errors: [] });
                });
            }
        });
    }
});
router.post("/login", (req, res) => {
    const body = req.body;
    User_1.default.findOne({ email: body.email }, (err, foundUser) => {
        if (!foundUser) {
            res.status(400).json({
                status: "error",
                errors: ["username or password incorrect"],
            });
        }
        else if (err) {
            res.status(400).json({ status: "error", errors: [err] });
        }
        else {
            bcrypt_1.default.compare(body.password, foundUser.password, (err, result) => {
                if (err) {
                    res.status(400).json({ status: "error", errors: [err] });
                }
                else if (!result) {
                    res.status(400).json({
                        status: "error",
                        errors: ["username or password incorrect"],
                    });
                }
                else {
                    const payload = {
                        name: foundUser.name,
                        email: foundUser.email,
                        role: foundUser.role,
                    };
                    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                        expiresIn: "7d",
                    });
                    res.status(200).json({ status: "logged in", errors: [], token });
                }
            });
        }
    });
});
exports.default = router;
