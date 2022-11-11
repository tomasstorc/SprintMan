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
      values: ["Bc.", "Ing."],
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
    min: [2, "Minimum Length is 2"],
    max: [3, "Maximnum length is 3"],
  },
  imageUrl: {
    type: String,
    validate: [validateUrl, "invalid URL"],
  },
  icon: {
    type: String,
    default:
      "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school-1.png",
  },
  field: {
    type: String,
    enum: {
      values: ["it", "business"],
      message: `{VALUE} is not valid, must be it or business`,
    },
  },
  osubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  ssubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
  ossubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

const Programme = mongoose.model("Programme", programmeSchema);
export default Programme;
