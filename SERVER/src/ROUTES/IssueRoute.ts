import EXPRESS from "express";
import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";

import {
  Greet,
  Get,
  Filter,
  Add,
  Update,
  Delete,
  Reorder,
  Transfer,
  LogInit,
} from "../CONTROLLERS/IssueController.js";

const ROUTER = EXPRESS.Router();

ROUTER.use(Auth);

ROUTER.get("/info", Greet);
ROUTER.get("/", Get);
ROUTER.post("/find", Filter);
ROUTER.post("/", Add);
ROUTER.patch("/", Update);
ROUTER.delete("/", Delete);
ROUTER.post("/reorder", Reorder);
ROUTER.patch("/transfer", Transfer);
ROUTER.post("/init", LogInit);

export { ROUTER as IssueRouter };
