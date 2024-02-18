import EXPRESS from "express";
import { Greet } from "../CONTROLLERS/LogController.js";

const ROUTER = EXPRESS.Router();

ROUTER.get("/", Greet);

export { ROUTER as LogRouter };
