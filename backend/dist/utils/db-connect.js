"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_seed_1 = __importDefault(require("./db-seed"));
const logger_1 = __importDefault(require("./logger"));
// TODO: use azure mongodb
const dbConnect = () => {
    mongoose_1.default
        .connect(process.env.DB_URL)
        .then(() => {
        logger_1.default.info("connected to db");
        (0, db_seed_1.default)();
    })
        .catch((e) => {
        logger_1.default.error(`there was an error connecting to db, reason ${e}`);
    });
};
exports.default = dbConnect;
