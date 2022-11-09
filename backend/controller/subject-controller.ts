import express, { Request, Response } from "express";
import Subject from "../model/Subject";
import ISubject from "../interface/subject";
import isAuthenticated from "../middleware/isAuthenticated";
import isAdminOrEditor from "../middleware/isAdminOrEditor";
import isAdmin from "../middleware/isAdmin";
import { CallbackError } from "mongoose";
import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";
import Programme from "../model/Programme";

const router = express.Router();

router.get(
  "/",
  isAuthenticated,
  isAdminOrEditor,
  (req: Request, res: Response) => {
    Subject.find(
      (err: CallbackError | undefined, subjectList: Array<ISubject>) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        if (subjectList.length < 1) {
          return res
            .status(200)
            .json(new SuccessResponse("empty", "no subjects found"));
        } else {
          return res
            .status(200)
            .json(new SuccessResponse("success", subjectList));
        }
      }
    );
  }
);

router.get("/:id", (req: Request, res: Response) => {
  Subject.findById(
    req.params.id,
    (err: CallbackError | undefined, foundSubject: ISubject | undefined) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }
      if (!foundSubject) {
        return res.status(404).json(new ErrorResponse("not found"));
      } else {
        return res
          .status(200)
          .json(new SuccessResponse("success", foundSubject));
      }
    }
  );
});

router.post(
  "/",
  isAuthenticated,
  isAdminOrEditor,
  (req: Request, res: Response) => {
    const newSubject = new Subject(req.body);
    newSubject.save(
      (
        err: CallbackError | undefined,
        createdSubject: ISubject | undefined
      ) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        return res
          .status(201)
          .json(new SuccessResponse("created", createdSubject));
      }
    );
  }
);

router.put(
  "/:id",
  isAuthenticated,
  isAdminOrEditor,
  (req: Request, res: Response) => {
    Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      { runValidators: true, new: true, rawResult: true },
      (err: CallbackError | undefined, updatedSubject) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        return res
          .status(200)
          .json(new SuccessResponse("updated", updatedSubject.value));
      }
    );
  }
);

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  (req: Request, res: Response) => {
    Subject.findByIdAndDelete(
      req.params.id,
      (
        err: CallbackError | undefined,
        deletedSubject: ISubject | undefined
      ) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        return res.status(204).json(new SuccessResponse("deleted"));
      }
    );
  }
);

export default router;
