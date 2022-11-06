"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => {
    mongoose_1.default
        .connect(process.env.DB_URL)
        .then(() => {
        console.log("connected to db");
    })
        .catch((e) => {
        console.error(`there was an error connecting to db, reason ${e}`);
    });
};
exports.default = dbConnect;
