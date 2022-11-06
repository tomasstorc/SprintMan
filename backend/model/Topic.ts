import mongoose from "mongoose";
import ITopic from "../interface/topic";
import { digitalContentSchema } from "./DigitalContent";

export const topicSchema = new mongoose.Schema<ITopic>({
  name: {
    type: String,
    required: [true, "Name is required"],
    min: [3, "Name must be at least 3 characters long"],
    max: [30, "Maximum length for name exceeded"],
  },
  materials: [digitalContentSchema],
});

const Topic = mongoose.model("Topic", topicSchema);
export default Topic;
