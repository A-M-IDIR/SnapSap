import { NextFunction, Request, Response } from "express";
import { body, query } from "express-validator";
import Validate from "../UTILS/MIDDLEWARES/Validate.js";

const AddValidation = [
  body("projectName").notEmpty().withMessage("The Project-Name Is Required"),
  body("stateId").notEmpty().withMessage("The State-Id Is Required"),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

const IdValidation = [
  query("projectId").notEmpty().withMessage("The Project-Id Is Required"),
  (req: Request, res: Response, next: NextFunction) => {
    Validate(req, res, next);
  },
];

export const ProjectValidator = {
  AddValidation,
  IdValidation,
};
