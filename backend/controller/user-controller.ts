import User from "../model/User";
import IUser from "../interface/user";
import mongoose, { CallbackError, Document } from "mongoose";
import express, { Request, Response } from "express";
import isAdmin from "../middleware/isAdmin";
import isAuthenticated from "../middleware/isAuthenticated";
import ErrorResponse from "../response/error-response";
import SuccessResponse from "../response/success-response";
import bcrypt from "bcrypt";
import validatePassword from "../utils/validate-password";
import sendEmail from "../utils/send-email";
import AuthKey from "../model/AuthKey";
import crypto from "crypto";
import IAuthKey from "../interface/auth-key";

const router = express.Router();

router.get("/", isAuthenticated, isAdmin, (req: Request, res: Response) => {
  let options = new Object();
  if (req.query.role) {
    options = {
      role: req.query.role,
    };
  }
  const query = User.find(options).select(["name", "email", "role"]);
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

router.get("/:id", isAuthenticated, isAdmin, (req: Request, res: Response) => {
  const query = User.findOne({ _id: req.params.id }).select([
    "name",
    "email",
    "role",
  ]);
  query.exec((err: CallbackError | undefined, foundUser: IUser | null) => {
    if (err) {
      return res.status(400).json(new ErrorResponse(err));
    }
    if (!foundUser) {
      return res
        .status(404)
        .json(new ErrorResponse("no user with given id found"));
    }
    return res.status(200).json(new SuccessResponse("success", foundUser));
  });
});

router.post("/", isAuthenticated, isAdmin, (req: Request, res: Response) => {
  const body = req.body;

  if (!validatePassword(body.password)) {
    return res
      .status(400)
      .json(new ErrorResponse("Password did not meet minimum requirements"));
  }

  if (!(body.username || body.password || body.role || body.name)) {
    res.status(400).json(new ErrorResponse("Some required fields are missing"));
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
              user.save((err: CallbackError | undefined, user: any) => {
                if (err) return res.status(400).json(new ErrorResponse(err));
                let tmp = crypto.randomBytes(20).toString("hex");
                let authKey = new AuthKey<IAuthKey>({
                  key: tmp,
                });
                authKey.save();
                sendEmail(user?.email, user?.name, user._id, tmp);
                return res.json(new SuccessResponse("User created"));
              });
            }
          );
        }
      }
    );
  }
});

router.delete(
  "/:id",
  isAuthenticated,
  isAdmin,
  (req: Request, res: Response) => {
    User.findByIdAndDelete(
      req.params.id,
      (err: CallbackError | undefined, deletedUser: IUser) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        return res.status(204).json(new SuccessResponse("deleted"));
      }
    );
  }
);

router.put("/:id", isAuthenticated, isAdmin, (req: Request, res: Response) => {
  if (req.body.password) {
    bcrypt.hash(
      req.body.password,
      10,
      (err: Error | undefined, hash: string) => {
        User.findByIdAndUpdate(
          req.params.id,
          {
            name: req.body.name,
            email: req.body.email,
            password: hash,
            role: req.body.role,
          },
          { runValidators: true, upsert: true, rawResult: true },
          (err: CallbackError | undefined, updatedUser: any) => {
            if (err) {
              return res.status(400).json(new ErrorResponse(err));
            }
            if (req.query.key) AuthKey.findOneAndDelete({ key: req.query.key });
            return res
              .status(200)
              .json(new SuccessResponse("updated", updatedUser.value));
          }
        );
      }
    );
  } else {
    User.findByIdAndUpdate(
      req.params.id,
      req.body,

      (err: CallbackError | undefined, updatedUser: IUser) => {
        if (err) {
          return res.status(400).json(new ErrorResponse(err));
        }
        return res.status(200).json(new SuccessResponse("updated"));
      }
    );
  }
});

export default router;
