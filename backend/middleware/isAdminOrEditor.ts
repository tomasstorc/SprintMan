import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../response/error-response";

const isAdminOrEditor = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role === "admin" || req.user.role === "editor") {
    next();
  } else {
    return res.status(401).json(new ErrorResponse("unauthorized"));
  }
};

export default isAdminOrEditor;
