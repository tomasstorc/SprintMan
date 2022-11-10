import express, { Request, Response } from "express";
import { appendFile } from "fs";
import mongoose, { CallbackError, Model } from "mongoose";
import IProgramme from "../interface/programme";
import isAdmin from "../middleware/isAdmin";
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
        .json(new SuccessResponse("empty", "no study programmes found"));
    } else {
      return res.status(200).json(new SuccessResponse("success", programmes));
    }
  })
    .populate("osubjects")
    .populate("ssubjects")
    .populate("ossubjects");
});

router.get("/:id", (req, res) => {
  Programme.findById(
    req.params.id,
    (err: CallbackError, foundProgramme: IProgramme | undefined) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }
      if (!foundProgramme) {
        return res.status(404).json(new ErrorResponse("not found"));
      } else {
        return res
          .status(200)
          .json(new SuccessResponse("succesws", foundProgramme));
      }
    }
  );
});

router.post("/", isAuthenticated, isAdminOrEditor, (req, res) => {
  const newProgramme = new Programme(req.body);
  if (newProgramme.degree === "Ing.")
    newProgramme.icon =
      "https://subjectmansa.blob.core.windows.net/subjectmanpics/ion_school.png";
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

router.put("/:id", isAuthenticated, isAdminOrEditor, (req, res) => {
  Programme.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { runValidators: true, new: true, rawResult: true },
    (err: CallbackError, updatedProgramme) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }

      return res
        .status(200)
        .json(new SuccessResponse("updated", updatedProgramme.value));
    }
  );
});

router.delete("/:id", isAuthenticated, isAdmin, (req, res) => {
  Programme.findByIdAndDelete(
    req.params.id,
    (err: CallbackError | undefined, deletedProgramme: mongoose.Document) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }
      return res.status(204).json(new SuccessResponse("deleted"));
    }
  );
});

router.post("/:id/osubject", isAuthenticated, isAdminOrEditor, (req, res) => {
  Programme.findById(
    req.params.id,
    (err: CallbackError | undefined, foundProgramme: any) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }

      for (let i = 0; i < req.body.ids.length; i++) {
        foundProgramme?.osubjects?.push(req.body.ids[i]);
      }
      foundProgramme.save(
        (err: CallbackError, updatedProgramme: IProgramme) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          return res
            .status(200)
            .json(new SuccessResponse("updated", updatedProgramme));
        }
      );
    }
  );
});

router.post("/:id/ssubject", isAuthenticated, isAdminOrEditor, (req, res) => {
  Programme.findById(
    req.params.id,
    (err: CallbackError | undefined, foundProgramme: any) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }

      for (let i = 0; i < req.body.ids.length; i++) {
        foundProgramme?.ssubjects?.push(req.body.ids[i]);
      }
      foundProgramme.save(
        (err: CallbackError, updatedProgramme: IProgramme) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          return res
            .status(200)
            .json(new SuccessResponse("updated", updatedProgramme));
        }
      );
    }
  );
});

router.post("/:id/ossubject", isAuthenticated, isAdminOrEditor, (req, res) => {
  Programme.findById(
    req.params.id,
    (err: CallbackError | undefined, foundProgramme: any) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }

      for (let i = 0; i < req.body.ids.length; i++) {
        foundProgramme?.ossubjects?.push(req.body.ids[i]);
      }
      foundProgramme.save(
        (err: CallbackError, updatedProgramme: IProgramme) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          return res
            .status(200)
            .json(new SuccessResponse("updated", updatedProgramme));
        }
      );
    }
  );
});

router.delete("/:id/osubject", isAuthenticated, isAdminOrEditor, (req, res) => {
  Programme.findById(
    req.params.id,
    (err: CallbackError | undefined, foundProgramme: any) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }

      for (let i = 0; i < req.body.ids.length; i++) {
        foundProgramme?.osubjects?.push(req.body.ids[i]);
      }
      foundProgramme.save(
        (err: CallbackError, updatedProgramme: IProgramme) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          return res
            .status(200)
            .json(new SuccessResponse("updated", updatedProgramme));
        }
      );
    }
  );
});

router.delete("/:id/ssubject", isAuthenticated, isAdminOrEditor, (req, res) => {
  Programme.findById(
    req.params.id,
    (err: CallbackError | undefined, foundProgramme: any) => {
      if (err) {
        return res.status(400).json(new ErrorResponse(err));
      }

      for (let i = 0; i < req.body.ids.length; i++) {
        foundProgramme?.ssubjects?.push(req.body.ids[i]);
      }
      foundProgramme.save(
        (err: CallbackError, updatedProgramme: IProgramme) => {
          if (err) {
            return res.status(400).json(new ErrorResponse(err));
          }
          return res
            .status(200)
            .json(new SuccessResponse("updated", updatedProgramme));
        }
      );
    }
  );
});

router.delete(
  "/:id/ossubject",
  isAuthenticated,
  isAdminOrEditor,
  (req, res) => {
    Programme.findById(
      req.params.id,
      (err: CallbackError | undefined, foundProgramme: any) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }

        foundProgramme?.ossubjects?.filter(
          (item: mongoose.Schema.Types.ObjectId) => !req.body.ids.includes(item)
        );

        foundProgramme.save(
          (err: CallbackError, updatedProgramme: IProgramme) => {
            if (err) {
              return res.status(400).json(new ErrorResponse(err));
            }
            return res
              .status(200)
              .json(new SuccessResponse("updated", updatedProgramme));
          }
        );
      }
    );
  }
);
export default router;
