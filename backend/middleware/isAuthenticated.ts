import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import IUser from "../interface/user";
import ErrorResponse from "../response/error-response";
import AuthKey from "../model/AuthKey";
import { CallbackError } from "mongoose";

const isAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.key) {
    AuthKey.findOne(
      { key: req.body.key },
      (err: CallbackError, foundKey: any) => {
        if (err) {
          return res.status(403).json(new ErrorResponse("unauthorized"));
        }
        if (!foundKey) {
          return res.status(403).json(new ErrorResponse("invalid key"));
        }
        next();
      }
    );
  }
  const authHeader: string | undefined = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json(new ErrorResponse("unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user: any) => {
    if (err) return res.status(403).json({ status: "error", errors: [err] });

    req.user = user;
    next();
  });
};

export default isAuthenticated;
