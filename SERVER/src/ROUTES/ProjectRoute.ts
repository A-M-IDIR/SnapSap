import EXPRESS, { Router } from "express";
import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";
import { ProjectValidator } from "../VALIDATORS/ProjectValidator.js";

import {
  Greet,
  Get,
  Add,
  Update,
  GetStates,
} from "../CONTROLLERS/ProjectController.js";

const ROUTER = EXPRESS.Router();

ROUTER.use(Auth);

ROUTER.get("/", Greet);
ROUTER.get("/get", Get);
ROUTER.get("/state", GetStates);
ROUTER.post("/", ProjectValidator.AddValidation, Add);
ROUTER.patch("/", Update);

export { ROUTER as ProjectRouter };
