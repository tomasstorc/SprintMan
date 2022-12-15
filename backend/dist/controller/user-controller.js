"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../model/User"));
const express_1 = __importDefault(require("express"));
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const isAuthenticated_1 = __importDefault(require("../middleware/isAuthenticated"));
const error_response_1 = __importDefault(require("../response/error-response"));
const success_response_1 = __importDefault(require("../response/success-response"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validate_password_1 = __importDefault(require("../utils/validate-password"));
const send_email_1 = __importDefault(require("../utils/send-email"));
const router = express_1.default.Router();
router.get("/", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    let options = new Object();
    if (req.query.role) {
        options = {
            role: req.query.role,
        };
    }
    const query = User_1.default.find(options).select(["name", "email", "role"]);
    query.exec((err, foundUsers) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        if (foundUsers.length === 0) {
            return res.status(204).json(new success_response_1.default("empty"));
        }
        return res.status(200).json(new success_response_1.default("success", foundUsers));
    });
});
router.get("/:id", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    const query = User_1.default.findOne({ _id: req.params.id }).select([
        "name",
        "email",
        "role",
    ]);
    query.exec((err, foundUser) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        if (!foundUser) {
            return res
                .status(404)
                .json(new error_response_1.default("no user with given id found"));
        }
        return res.status(200).json(new success_response_1.default("success", foundUser));
    });
});
router.post("/", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    const body = req.body;
    if (!(0, validate_password_1.default)(body.password)) {
        return res
            .status(400)
            .json(new error_response_1.default("Password did not meet minimum requirements"));
    }
    if (!(body.username || body.password || body.role || body.name)) {
        res.status(400).json(new error_response_1.default("Some required fields are missing"));
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
                        (0, send_email_1.default)(user === null || user === void 0 ? void 0 : user.email, user === null || user === void 0 ? void 0 : user.name, user._id);
                        return res.json(new success_response_1.default("User created"));
                    });
                });
            }
        });
    }
});
router.delete("/:id", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    User_1.default.findByIdAndDelete(req.params.id, (err, deletedUser) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        return res.status(204).json(new success_response_1.default("deleted"));
    });
});
router.put("/:id", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    if (req.body.password) {
        bcrypt_1.default.hash(req.body.password, 10, (err, hash) => {
            User_1.default.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                password: hash,
                role: req.body.role,
            }, { runValidators: true, upsert: true, rawResult: true }, (err, updatedUser) => {
                if (err) {
                    return res.status(400).json(new error_response_1.default(err));
                }
                return res
                    .status(200)
                    .json(new success_response_1.default("updated", updatedUser.value));
            });
        });
    }
    else {
        User_1.default.findByIdAndUpdate(req.params.id, req.body, (err, updatedUser) => {
            if (err) {
                return res.status(400).json(new error_response_1.default(err));
            }
            return res.status(200).json(new success_response_1.default("updated"));
        });
    }
});
exports.default = router;
