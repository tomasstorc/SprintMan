import User from "../model/User";
import IUser from "../interface/user";
import mongoose, { CallbackError } from "mongoose";
import express, { Request, Response } from "express";
import isAdmin from "../middleware/isAdmin";
import isAuthenticated from "../middleware/isAuthenticated";
import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, (req: Request, res: Response) => {
  let options = new Object();
  if (req.query.role) {
    options = {
      role: req.query.role,
    };
  }
  const query = User.find(options).select(["name", "email"]);
  query.exec((err: CallbackError | undefined, foundUsers: Array<IUser>) => {
    if (err) {
      return res.status(400).json(new ErrorResponse(err));
    }
    if (foundUsers.length === 0) {
      return res.status(204).json(new SuccessResponse("empty"));
    }
    return res.status(200).json(new SuccessResponse("success", foundUsers));
  });
});

export default router;
