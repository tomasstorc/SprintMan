import express, { Request, Response } from "express";
import Subject from "../model/Subject";
import ISubject from "../interface/subject";
import isAuthenticated from "../middleware/isAuthenticated";
import isAdminOrEditor from "../middleware/isAdminOrEditor";
import isAdmin from "../middleware/isAdmin";
import mongoose, { CallbackError } from "mongoose";
import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";
import Programme from "../model/Programme";
import ITopic from "../interface/topic";

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

// create topic
router.post(
  "/:id/topic",
  isAuthenticated,
  isAdminOrEditor,
  (req: Request, res: Response) => {
    Subject.findByIdAndUpdate(
      req.params.id,
      { $push: { topics: req.body } },
      { runValidators: true, new: true, rawResult: true },
      (
        err: CallbackError | undefined,
        updatedSubject: ISubject | undefined
      ) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        return res
          .status(200)
          .json(new SuccessResponse("added", updatedSubject));
      }
    );
  }
);

router.put(
  "/:id/topic/",
  isAuthenticated,
  isAdminOrEditor,
  (req: Request, res: Response) => {
    Subject.findByIdAndUpdate(
      req.params.id,
      { $set: { topics: req.body } },
      { runValidators: true, new: true, rawResult: true },
      (
        err: CallbackError | undefined,
        updatedSubject: ISubject | undefined
      ) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        return res
          .status(200)
          .json(new SuccessResponse("updated", updatedSubject));
      }
    );
  }
);

router.delete(
  "/:id/topic",
  isAuthenticated,
  isAdminOrEditor,
  (req: Request, res: Response) => {
    Subject.findByIdAndUpdate(
      req.params.id,
      { $pull: { topics: req.body } },
      { runValidators: true, new: true, rawResult: true },
      (
        err: CallbackError | undefined,
        updatedSubject: ISubject | undefined
      ) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        return res
          .status(200)
          .json(new SuccessResponse("deleted", updatedSubject));
      }
    );
  }
);

router.post(
  "/:id/material",
  isAuthenticated,
  isAdminOrEditor,
  (req: Request, res: Response) => {
    if (req.body.topicId) {
      Subject.findById(
        req.params.id,
        (err: CallbackError | undefined, foundSubject: any) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          const topic = foundSubject.topics.filter(
            (topic: any) =>
              new mongoose.Schema.Types.ObjectId(req.params.topicId) ===
              topic._id
          );
          foundSubject.topics.pull(topic);
          topic.push(req.body.material);
          foundSubject.topics.push(topic);
          foundSubject.save(
            (
              err: CallbackError | undefined,
              updatedSubject: ISubject | undefined
            ) => {
              if (err) {
                return res.status(400).json(new ErrorResponse(err));
              }
              return res
                .status(200)
                .json(new SuccessResponse("added", updatedSubject));
            }
          );
        }
      );
    } else {
      Subject.findByIdAndUpdate(
        req.params.id,
        { $push: { materials: req.body } },
        { runValidators: true, new: true, rawResult: true },
        (
          err: CallbackError | undefined,
          updatedSubject: ISubject | undefined
        ) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          return res
            .status(200)
            .json(new SuccessResponse("added", updatedSubject));
        }
      );
    }
  }
);

router.delete(
  "/:id/material",
  isAuthenticated,
  isAdminOrEditor,
  (req: Request, res: Response) => {
    if (req.body.topicId) {
      Subject.findById(
        req.params.id,
        (err: CallbackError | undefined, foundSubject: any) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          const topic = foundSubject.topics.filter(
            (topic: any) =>
              new mongoose.Schema.Types.ObjectId(req.params.topicId) ===
              topic._id
          );
          foundSubject.topics.pull(topic);
          topic.pull(req.body.material);
          foundSubject.topics.push(topic);
          foundSubject.save(
            (
              err: CallbackError | undefined,
              updatedSubject: ISubject | undefined
            ) => {
              if (err) {
                return res.status(400).json(new ErrorResponse(err));
              }
              return res
                .status(200)
                .json(new SuccessResponse("added", updatedSubject));
            }
          );
        }
      );
    } else {
      Subject.findByIdAndUpdate(
        req.params.id,
        { $pull: { materials: req.body } },
        { runValidators: true, new: true, rawResult: true },
        (
          err: CallbackError | undefined,
          updatedSubject: ISubject | undefined
        ) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          return res
            .status(200)
            .json(new SuccessResponse("added", updatedSubject));
        }
      );
    }
  }
);

export default router;
