import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../model/User";

import IUser from "../interface/user";

import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";

const router = express.Router();

router.post("/login", (req: Request, res: Response) => {
  const body = req.body;

  User.findOne(
    { email: body.email },
    (err: Error | undefined, foundUser: IUser | undefined) => {
      if (!foundUser) {
        res
          .status(401)
          .json(new ErrorResponse("username or password incorrect"));
      } else if (err) {
        res.status(400).json(new ErrorResponse(err));
      } else {
        bcrypt.compare(
          body.password,
          foundUser.password,
          (err, result: boolean) => {
            if (err) {
              res.status(400).json(new ErrorResponse(err));
            } else if (!result) {
              res
                .status(401)
                .json(new ErrorResponse("username or password incorrect"));
            } else {
              const payload = {
                name: foundUser.name,
                email: foundUser.email,
                role: foundUser.role,
              };
              const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "7d",
              });
              res.cookie("token", token, { secure: true });
              res.status(200).json(new SuccessResponse("logged in", token));
            }
          }
        );
      }
    }
  );
});

router.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.redirect("/");
});

router.get(
  "/facebook",
  passport.authenticate("facebook-auth", { scope: "email" })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook-auth", { session: false }),

  (req: Request, res: Response) => {
    const payload = {
      email: req?.user?.email,
      name: req?.user?.name,
      role: req?.user?.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { secure: true });
    res.redirect("/");
  }
);

export default router;
