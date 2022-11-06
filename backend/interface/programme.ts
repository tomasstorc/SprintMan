import mongoose from "mongoose";
export default interface IProgramme {
  name: string;
  description: string;
  degree: "Bc." | "Msc.";
  language: "czech" | "english";
  length: number;
  osubjects?: Array<mongoose.Schema.Types.ObjectId>;
  ssubjects?: Array<mongoose.Schema.Types.ObjectId>;
  ossubjects?: Array<mongoose.Schema.Types.ObjectId>;
}
