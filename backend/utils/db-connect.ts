import mongoose from "mongoose";
import dbSeed from "./db-seed";
import logger from "./logger";

// TODO: use azure mongodb
const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      logger.info("connected to db");
      dbSeed();
    })
    .catch((e) => {
      logger.error(`there was an error connecting to db, reason ${e}`);
    });
};

export default dbConnect;
