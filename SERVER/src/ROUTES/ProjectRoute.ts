import EXPRESS from "express";
import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";
import { ProjectValidator } from "../VALIDATORS/ProjectValidator.js";

import {
  Greet,
  Get,
  GetDetails,
  Filter,
  Join,
  Add,
  Update,
  Delete,
} from "../CONTROLLERS/ProjectController.js";

const ROUTER = EXPRESS.Router();

ROUTER.use(Auth);

ROUTER.get("/info", Greet);
ROUTER.get("/", Get);
ROUTER.get("/detail", GetDetails);
ROUTER.post("/filter", Filter);
ROUTER.post("/join", Join);
ROUTER.post("/", ProjectValidator.AddValidation, Add);
ROUTER.patch("/", ProjectValidator.IdValidation, Update);
ROUTER.delete("/", ProjectValidator.IdValidation, Delete);

export { ROUTER as ProjectRouter };
