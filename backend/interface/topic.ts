import mongoose from "mongoose";
import IDigitalContent from "./digital-content";

export default interface ITopic {
  name: string;
  materials: Array<IDigitalContent>;
}
