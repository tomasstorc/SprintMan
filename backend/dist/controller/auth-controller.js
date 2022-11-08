"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../model/User"));
const validate_password_1 = __importDefault(require("../utils/validate-password"));
const error_response_1 = __importDefault(require("../response/error-response"));
const success_response_1 = __importDefault(require("../response/success-response"));
const router = express_1.default.Router();
router.post("/register", (req, res) => {
    const body = req.body;
    if (!(0, validate_password_1.default)(body.password)) {
        return res
            .status(400)
            .json(new error_response_1.default("Password did not meet minimum requirements"));
    }
    if (!(body.username || body.password || body.role || body.name)) {
        res
            .status(400)
            .json(new error_response_1.default("Some required fields are missing"));
    }
    else {
        User_1.default.findOne({ email: body.email }, (err, foundUser) => {
            if (foundUser) {
                res
                    .status(400)
                    .json(new error_response_1.default("user with given email already exists"));
            }
            else if (err) {
                res.status(400).json(new error_response_1.default(err));
            }
            else {
                bcrypt_1.default.hash(body.password, 10, (err, hash) => {
                    if (err)
                        res.status(400).json(new error_response_1.default(err));
                    const user = new User_1.default({
                        email: body.email,
                        name: body.name,
                        password: hash,
                        role: body.role,
                    });
                    user.save((err, user) => {
                        if (err)
                            return res.status(400).json(new error_response_1.default(err));
                        return res.json(new success_response_1.default("User created"));
                    });
                });
            }
        });
    }
});
router.post("/login", (req, res) => {
    const body = req.body;
    User_1.default.findOne({ email: body.email }, (err, foundUser) => {
        if (!foundUser) {
            res
                .status(401)
                .json(new error_response_1.default("username or password incorrect"));
        }
        else if (err) {
            res.status(400).json(new error_response_1.default(err));
        }
        else {
            bcrypt_1.default.compare(body.password, foundUser.password, (err, result) => {
                if (err) {
                    res.status(400).json(new error_response_1.default(err));
                }
                else if (!result) {
                    res
                        .status(401)
                        .json(new error_response_1.default("username or password incorrect"));
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
                    res.status(200).json(new success_response_1.default("logged in", token));
                }
            });
        }
    });
});
router.get("/facebook", passport_1.default.authenticate("facebook-auth", { scope: "email" }));
router.get("/facebook/callback", passport_1.default.authenticate("facebook-auth", { session: false }), (req, res) => {
    var _a, _b, _c;
    const payload = {
        email: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email,
        name: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.name,
        role: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.role,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("token", token);
    res.redirect("/");
});
exports.default = router;
