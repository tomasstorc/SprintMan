import mongoose from "mongoose";
export default interface IProgramme {
  _id?: mongoose.Types.ObjectId;
  name: string;
  description: string;
  degree: "Bc." | "Ing.";
  language: "czech" | "english"[];
  length: number;
  imageUrl?: string;
  icon?: string;
  field: "it" | "business";
  osubjects?: Array<mongoose.Schema.Types.ObjectId>;
  ssubjects?: Array<mongoose.Schema.Types.ObjectId>;
  ossubjects?: Array<mongoose.Schema.Types.ObjectId>;
}
