import mongoose from "mongoose";
import dbSeed from "./db-seed";

// TODO: use azure mongodb
const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connected to db");
      dbSeed();
    })
    .catch((e) => {
      console.error(`there was an error connecting to db, reason ${e}`);
    });
};

export default dbConnect;
