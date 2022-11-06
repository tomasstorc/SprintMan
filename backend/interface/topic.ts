import mongoose from "mongoose";

export default interface ITopic {
  name: string;
  materials: Array<mongoose.Schema.Types.ObjectId>;
}
