import express, { Request, Response } from "express";
import { appendFile } from "fs";
import { CallbackError } from "mongoose";
import IProgramme from "../interface/programme";
import isAdminOrEditor from "../middleware/isAdminOrEditor";
import isAuthenticated from "../middleware/isAuthenticated";
import Programme from "../model/Programme";
import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";

const router = express.Router();

const options = { runValidators: true, new: true, rawResult: true };

router.get("/", (req, res) => {
  Programme.find((err: Error, programmes: Array<IProgramme>) => {
    if (err) {
      return res.status(400).json(new ErrorResponse(err));
    }
    if (programmes.length < 1) {
      return res
        .status(200)
        .json(new SuccessResponse("success", "no study programmes found"));
    } else {
      return res.status(200).json(new SuccessResponse("success", programmes));
    }
  });
});

router.post("/", isAuthenticated, isAdminOrEditor, (req, res) => {
  const newProgramme = new Programme(req.body);
  newProgramme.save(
    (err: CallbackError | undefined, programmeCreated: IProgramme) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }
      return res
        .status(201)
        .json(new SuccessResponse("created", programmeCreated));
    }
  );
});

router.put("/:id", (req, res) => {
  Programme.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true, new: true, rawResult: true },
    (err: CallbackError, updatedProgramme: IProgramme) => {
      console.log(updatedProgramme);

      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }
      return res
        .status(200)
        .json(new SuccessResponse("updated", updatedProgramme));
    }
  );
});
export default router;
