import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../model/User";
import { CallbackError, Model } from "mongoose";
import IUser from "../interface/user";
import validatePassword from "../utils/validate-password";
import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";
import isAuthenticated from "../middleware/isAuthenticated";
import isAdmin from "../middleware/isAdmin";

const router = express.Router();

router.post(
  "/register",
  isAuthenticated,
  isAdmin,
  (req: Request, res: Response) => {
    const body = req.body;

    if (!validatePassword(body.password)) {
      return res
        .status(400)
        .json(new ErrorResponse("Password did not meet minimum requirements"));
    }

    if (!(body.username || body.password || body.role || body.name)) {
      res
        .status(400)
        .json(new ErrorResponse("Some required fields are missing"));
    } else {
      User.findOne(
        { email: body.email },
        (err: Error | undefined, foundUser: IUser | undefined) => {
          if (foundUser) {
            res
              .status(400)
              .json(new ErrorResponse("user with given email already exists"));
          } else if (err) {
            res.status(400).json(new ErrorResponse(err));
          } else {
            bcrypt.hash(
              body.password,
              10,
              (err: Error | undefined, hash: string) => {
                if (err) res.status(400).json(new ErrorResponse(err));
                const user = new User<IUser>({
                  email: body.email,
                  name: body.name,
                  password: hash,
                  role: body.role,
                });
                user.save(
                  (err: CallbackError | undefined, user: IUser | undefined) => {
                    if (err)
                      return res.status(400).json(new ErrorResponse(err));
                    return res.json(new SuccessResponse("User created"));
                  }
                );
              }
            );
          }
        }
      );
    }
  }
);

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
              res.status(200).json(new SuccessResponse("logged in", token));
            }
          }
        );
      }
    }
  );
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
    res.status(200).json(new SuccessResponse("logged in", token));
  }
);

export default router;
