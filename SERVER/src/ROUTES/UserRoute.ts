import EXPRESS from "express";
import { Greet } from "../CONTROLLERS/UserController.js";

const ROUTER = EXPRESS.Router();

ROUTER.get("/", Greet);

export { ROUTER as UserRouter };
