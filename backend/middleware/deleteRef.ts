import Programme from "../model/Programme";
import IProgramme from "../interface/programme";
import mongoose, { Types, CallbackError } from "mongoose";
import { NextFunction } from "express";
import { Request, Response } from "express";
import ErrorResponse from "../response/error-response";
import logger from "../utils/logger";

const deleteRef = (req: Request, res: Response, next: NextFunction) => {
  let subjectId: any = new mongoose.Types.ObjectId(req.params.id);
  Programme.find(
    {},
    (err: CallbackError | undefined, foundProgrammes: Array<IProgramme>) => {
      if (err) {
        logger.error(`There was an problem finding programmes, reason: ${err}`);
        return res.status(400).json(new ErrorResponse(err));
      }
      foundProgrammes.map((program) => {
        if (program.osubjects?.includes(subjectId)) {
          Programme.updateOne(
            { _id: program._id },
            { $pull: { osubjects: subjectId } },
            (err: CallbackError | undefined, updateProgramme: IProgramme) => {
              console.log(updateProgramme);

              if (err) {
                logger.error(
                  `There was an problem deleteting subject from program, reason ${err}`
                );
                x;
                return res.status(400).json(new ErrorResponse(err));
              }
              logger.info(
                `Subject ${subjectId} successfully deleted from program ${program.name} - osubject`
              );
            }
          );
        } else if (program.ssubjects?.includes(subjectId)) {
          Programme.updateOne(
            { _id: program._id },
            { $pull: { ssubjects: { _id: subjectId } } },
            (err: CallbackError | undefined, updateProgramme: IProgramme) => {
              if (err) {
                logger.error(
                  `There was an problem deleteting subject from program, reason ${err}`
                );
                return res.status(400).json(new ErrorResponse(err));
              }
              logger.info(
                `Subject ${subjectId} successfully deleted from program ${program.name} - ssubjects`
              );
            }
          );
        } else if (program.ossubjects?.includes(subjectId)) {
          Programme.updateOne(
            { _id: program._id },
            { $pull: { ossubjects: { _id: subjectId } } },
            (err: CallbackError | undefined, updateProgramme: IProgramme) => {
              if (err) {
                logger.error(
                  `There was an problem deleteting subject from program, reason ${err}`
                );
                return res.status(400).json(new ErrorResponse(err));
              }
              logger.info(
                `Subject ${subjectId} successfully deleted from program ${program.name} - ossubjects`
              );
            }
          );
        }
      });
      next();
    }
  );
};

export default deleteRef;
