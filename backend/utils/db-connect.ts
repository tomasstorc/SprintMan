import mongoose from "mongoose";

// TODO: use azure mongodb
const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("connected to db");
    })
    .catch((e) => {
      console.error(`there was an error connecting to db, reason ${e}`);
    });
};

export default dbConnect;
