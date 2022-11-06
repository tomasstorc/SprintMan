import mongoose from "mongoose";
import IDigitalContent from "../interface/digital-content";
import validateUrl from "../utils/validate-url";

const digitalContentSchema = new mongoose.Schema<IDigitalContent>({
  name: {
    type: String,
    required: [true, "Name is required"],
    min: [3, " Name must be atleast 3 characters long"],
    max: [30, "Maximum cagaracters exceeded"],
  },
  link: {
    type: String,
    validate: [validateUrl, "Invalid link provided"],
  },
});

const DigitalContent = mongoose.model("digitalContents", digitalContentSchema);
export default DigitalContent;
