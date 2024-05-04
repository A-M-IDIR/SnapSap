import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import Validate from "../UTILS/MIDDLEWARES/Validate.js";

const RegisterValidation = [
  body("userName").notEmpty().withMessage("The User-Name is Required."),
  body("email")
    .notEmpty()
    .withMessage("The Email Is Required.")
    .isEmail()
    .withMessage("Please Check Your Email."),
  body("password")
    .notEmpty()
    .withMessage("The Password Is Required.")
    .isLength({ min: 6 })
    .withMessage("Password Must Be Atleast 6 Characters Long."),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

const NewOtpValidation = [
  body("email")
    .notEmpty()
    .withMessage("The Email Is Required.")
    .isEmail()
    .withMessage("Please Check Your Email."),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

const VerifyUserValidation = [
  body("userId").notEmpty().withMessage("User-Id Is Required"),
  body("code").notEmpty().withMessage("The Otp Code Is Required"),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

const LoginValidation = [
  body("email")
    .notEmpty()
    .withMessage("The Email Is Required.")
    .isEmail()
    .withMessage("Please Check Your Email."),
  body("password")
    .notEmpty()
    .withMessage("The Passowrd Is Required")
    .isLength({ min: 6 })
    .withMessage("Please Check Your Password."),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

const UpdateUserValidation = [
  body("updatedData.userName")
    .optional()
    .notEmpty()
    .withMessage("Username cannot be empty."),
  body("updatedData.email")
    .optional()
    .notEmpty()
    .withMessage("Email cannot be empty.")
    .isEmail()
    .withMessage("Invalid email format."),
  body("updatedData.password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  body("currentPassword")
    .optional()
    .notEmpty()
    .withMessage("Current password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

export const UserValidator = {
  RegisterValidation,
  NewOtpValidation,
  VerifyUserValidation,
  LoginValidation,
  UpdateUserValidation,
};
