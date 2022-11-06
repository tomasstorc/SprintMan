import mongoose from "mongoose";
import ITopic from "../interface/topic";

export const topicScheme = new mongoose.Schema<ITopic>({
  name: {
    type: String,
    required: [true, "Name is required"],
    min: [3, "Name must be at least 3 characters long"],
    max: [30, "Maximum length for name exceeded"],
  },
  materials: [{ Type: mongoose.Schema.Types.ObjectId, ref: "DigitalContent" }],
});

const Topic = mongoose.model("Topic", topicScheme);
export default Topic;
