import IProgramme from "../interface/programme";
import validateUrl from "../utils/validate-url";

import mongoose from "mongoose";

const programmeSchema = new mongoose.Schema<IProgramme>({
  name: {
    type: String,
    required: [true, "Name is required"],
    min: [3, "Name must be atleast 3 characters long"],
    max: [30, "Maximum length for name exceeded"],
  },
  description: {
    type: String,
    required: [true, "Goal is required"],
    min: [3, "Description must be atleast 3 characters long"],
    max: [1000, "Maximum length for description exceeded"],
  },
  degree: {
    type: String,
    enum: {
      values: ["Bc.", "Msc."],
      message: `{VALUE} is not valid, must be Bc. or Msc.`,
    },
  },
  language: {
    type: String,
    enum: {
      values: ["czech", "english"],
      message: `{VALUE} is not valid, must be czech or english`,
    },
  },
  length: {
    type: Number,
    required: [true, "Length is reqired"],
    min: [3, "Minimum Length is 3"],
    max: [6, "Maximnum length is 6"],
  },
  imageUrl: {
    type: String,
    validate: [validateUrl, "invalid URL"],

  osubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  ssubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  ossubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

const Programme = mongoose.model("Programme", programmeSchema);
export default Programme;
