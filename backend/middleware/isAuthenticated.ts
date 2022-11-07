import { RequestHandler, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import IUser from "../interface/user";
import ErrorResponse from "../response/error-response";

const isAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json(new ErrorResponse("unauthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ status: "error", errors: [err] });

    req.user = user;
    next();
  });
};

export default isAuthenticated;
