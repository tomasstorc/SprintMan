import ITopic from "./topic";
import IDigitalContent from "./digital-content";
import mongoose from "mongoose";

export default interface ISubject {
  name: string;
  credits: number;
  language: "czech" | "english";
  degree: "Bc." | "Msc.";
  supervisor: string;
  teacher: string;
  goal: string;
  materials?: IDigitalContent;
  topics?: ITopic;
}
