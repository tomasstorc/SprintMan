import ITopic from "./topic";
import IDigitalContent from "./digital-content";
import mongoose from "mongoose";

export default interface ISubject {
  _id?: mongoose.Types.ObjectId;
  name: string;
  credits: number;
  language: "czech" | "english";
  degree: "Bc." | "Msc.";
  supervisor: string;
  teacher: string;
  goal: string;
  materials?: Array<IDigitalContent>;
  topics?: Array<ITopic>;
}
