import express from "express";

import authController from "../controller/auth-controller";
import subjectController from "../controller/subject-controller";
import programmeController from "../controller/programme-controller";

const app = express();

app.use(express.json());

app.use("/api/auth", authController);
app.use("/api/programme", programmeController);
app.use("/api/subject", subjectController);

export default app;
