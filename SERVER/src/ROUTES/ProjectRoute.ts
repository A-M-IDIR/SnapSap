import EXPRESS from "express";
import { Greet } from "../CONTROLLERS/ProjectController.js";

const ROUTER = EXPRESS.Router();

ROUTER.get("/", Greet);

export { ROUTER as ProjectRouter };
