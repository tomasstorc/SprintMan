"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_seed_1 = __importDefault(require("./db-seed"));
// TODO: use azure mongodb
const dbConnect = () => {
    mongoose_1.default
        .connect(process.env.DB_URL)
        .then(() => {
        console.log("connected to db");
        (0, db_seed_1.default)();
    })
        .catch((e) => {
        console.error(`there was an error connecting to db, reason ${e}`);
    });
};
exports.default = dbConnect;
