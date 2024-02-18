import EXPRESS from "express";
import { Greet } from "../CONTROLLERS/IssueController.js";

const ROUTER = EXPRESS.Router();

ROUTER.get("/", Greet);

export { ROUTER as IssueRouter };
