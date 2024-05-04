import EXPRESS from "express";
import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";

import {
  Greet,
  Get,
  Find,
  GetDetails,
  Add,
  Update,
  Delete,
} from "../CONTROLLERS/LogController.js";

const ROUTER = EXPRESS.Router();

ROUTER.use(Auth);

ROUTER.get("/info", Greet);
ROUTER.get("/", Get);
ROUTER.get("/find", Find);
ROUTER.get("/details", GetDetails);
ROUTER.post("/", Add);
ROUTER.patch("/", Update);
ROUTER.delete("/", Delete);

export { ROUTER as LogRouter };
