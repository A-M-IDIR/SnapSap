import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import Validate from "../UTILS/MIDDLEWARES/Validate.js";

const RegisterValidation = [
  body("first_name").notEmpty().withMessage("FirstName is required"),
  body("last_name").notEmpty().withMessage("LastName is required"),
  body("user_name").notEmpty().withMessage("UserName is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Passowrd is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

const NewOtpValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

const VerifyUserValidation = [
  body("userId").notEmpty().withMessage("UserId is required"),
  body("code").notEmpty().withMessage("Code is required"),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

const LoginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Passowrd is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

export const UserValidator = {
  RegisterValidation,
  NewOtpValidation,
  VerifyUserValidation,
  LoginValidation,
};
