import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import dbConnect from "./utils/db-connect";

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

dbConnect();

app.get("/", (req: Request, res: Response) => {
  return res.json({ msg: "success" });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
