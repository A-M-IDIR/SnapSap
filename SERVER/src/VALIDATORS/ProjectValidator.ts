import { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import Validate from "../UTILS/MIDDLEWARES/Validate.js";

const AddValidation = [
  body("projectName").notEmpty().withMessage("projectName is required"),
  body("stateId").notEmpty().withMessage("stateId is required"),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

export const ProjectValidator = {
  AddValidation,
};
