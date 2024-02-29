import EXPRESS from "express";

import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";

import {
  Greet,
  Get,
  Add,
  Update,
  Delete,
} from "../CONTROLLERS/GroupController.js";

const ROUTER = EXPRESS.Router();

ROUTER.use(Auth);

ROUTER.get("/", Greet);
ROUTER.get("/get", Get);
ROUTER.post("/", Add);
ROUTER.patch("/", Update);
ROUTER.delete("/", Delete);

export { ROUTER as GroupRouter };
