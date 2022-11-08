"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const FacebookStrategy = require("passport-facebook").Strategy;
const User_1 = __importDefault(require("../model/User"));
const facebookLogin = () => {
    passport_1.default.use("facebook-auth", new FacebookStrategy({
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: "/api/auth/facebook/callback",
        profileFields: ["id", "displayName", "email", "picture"],
    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User_1.default.findOne({ email: profile.email }, (err, foundUser) => {
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
};
exports.default = facebookLogin;
