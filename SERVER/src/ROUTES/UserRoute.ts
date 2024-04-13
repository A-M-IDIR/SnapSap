import EXPRESS from "express";
import { UserValidator } from "../VALIDATORS/UserValidator.js";
import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";

import {
  Greet,
  Register,
  NewOtp,
  Verify,
  Login,
  Get,
} from "../CONTROLLERS/UserController.js";

const ROUTER = EXPRESS.Router();

ROUTER.get("/info", Greet);
ROUTER.get("/", Auth, Get);
ROUTER.post("/register", UserValidator.RegisterValidation, Register);
ROUTER.post("/otp", UserValidator.NewOtpValidation, NewOtp);
ROUTER.post("/verify", UserValidator.VerifyUserValidation, Verify);
ROUTER.post("/login", UserValidator.LoginValidation, Login);

export { ROUTER as UserRouter };
