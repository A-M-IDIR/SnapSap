import EXPRESS from "express";
import { Greet } from "../CONTROLLERS/LogController.js";

import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";

const ROUTER = EXPRESS.Router();

ROUTER.use(Auth);

ROUTER.get("/", Greet);

export { ROUTER as LogRouter };
