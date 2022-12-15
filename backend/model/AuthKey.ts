import mongoose from "mongoose";
import IAuthKey from "../interface/auth-key";

export const authKeySchema = new mongoose.Schema<IAuthKey>({
  key: {
    type: String,
    required: true,
  },
});

const AuthKey = mongoose.model("AuthKey", authKeySchema);
export default AuthKey;
