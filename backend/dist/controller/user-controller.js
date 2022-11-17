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
const router = express_1.default.Router();
router.get("/", isAuthenticated_1.default, isAdmin_1.default, (req, res) => {
    let options = new Object();
    if (req.query.role) {
        options = {
            role: req.query.role,
        };
    }
    const query = User_1.default.find(options).select(["name", "email"]);
    query.exec((err, foundUsers) => {
        if (err) {
            return res.status(400).json(new error_response_1.default(err));
        }
        if (foundUsers.length === 0)
            return res.status(200).json(new success_response_1.default("success", foundUsers));
    });
});
exports.default = router;
