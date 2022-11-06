import mongoose, { Mongoose } from "mongoose";
import IUser from "../interface/user";
import validateEmail from "../utils/validate-email";
import validatePassword from "../utils/validate-password";

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, "Email address is required"],
    validate: [validateEmail, "Email is not valid"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: [validatePassword, "Password did not meet minimum requirements"],
  },
});
