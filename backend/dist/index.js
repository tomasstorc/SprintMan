"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const FacebookStrategy = require("passport-facebook").Strategy;
const db_connect_1 = __importDefault(require("./utils/db-connect"));
const auth_controller_1 = __importDefault(require("./controller/auth-controller"));
const programme_controller_1 = __importDefault(require("./controller/programme-controller"));
const subject_controller_1 = __importDefault(require("./controller/subject-controller"));
const User_1 = __importDefault(require("./model/User"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
passport_1.default.use("facebook-auth", new FacebookStrategy({
    clientID: process.env.FB_APP_ID || "",
    clientSecret: process.env.FB_APP_SECRET || "",
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ["id", "displayName", "email", "picture"],
}, (accessToken, refreshToken, profile, done) => {
    User_1.default.findOne({ email: profile.emails[0].value }, (err, foundUser) => {
        if (err) {
            done(null, false);
        }
        if (foundUser) {
            done(null, foundUser);
        }
        else {
            done(null, false);
        }
    });
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(passport_1.default.initialize());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
const PORT = process.env.PORT || 8000;
(0, db_connect_1.default)();
app.use("/api/auth", auth_controller_1.default);
app.use("/api/programme", programme_controller_1.default);
app.use("/api/subject", subject_controller_1.default);
app.listen(PORT);
exports.default = express_1.default;
