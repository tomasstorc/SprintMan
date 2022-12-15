import mongoose from "mongoose";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const sendEmail = (
  to: string,
  name: string,
  id: mongoose.Types.ObjectId,
  key: string
) => {
  const options: SMTPTransport.Options = {
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      type: "login",
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PW as string,
    },
  };

  let transporter: any = nodemailer.createTransport(options);
  let message = {
    from: "SubjectMan <no-reply@uusubjectman.com>",
    to: to,
    subject: "Welcome to Subject Man",
    html: `
    <h1>Welcome ${name}!</h1><br>
    <p>Your account was successfully created, you can set your own password at this <a href="https://uusubjectman.com/changepassword/${id}?authKey=${key}">link</a>
    `,
  };
  transporter.sendMail(message);
};

export default sendEmail;
