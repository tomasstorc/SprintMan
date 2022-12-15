"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (to, name, id, key) => {
    const options = {
        host: "mail.privateemail.com",
        port: 465,
        secure: true,
        auth: {
            type: "login",
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PW,
        },
    };
    let transporter = nodemailer_1.default.createTransport(options);
    let message = {
        from: "SubjectMan <no-reply@uusubjectman.com>",
        to: to,
        subject: "Welcome to subject man",
        html: `
    <h1>Welcome ${name}!</h1><br>
    <p>Your account was successfully created, you can set your own password at this <a href="https://uusubjectman.com/changepassword/${id}?authKey=${key}">link</a>
    `,
    };
    transporter.sendMail(message);
};
exports.default = sendEmail;
