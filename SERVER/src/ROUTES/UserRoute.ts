import EXPRESS from "express";
import { UserValidator } from "../VALIDATORS/UserValidator.js";
import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";

import {
  Greet,
  Register,
  NewOtp,
  VerifyUser,
  Login,
  GetUser,
} from "../CONTROLLERS/UserController.js";

const ROUTER = EXPRESS.Router();

ROUTER.get("/", Greet);
ROUTER.post("/register", UserValidator.RegisterValidation, Register);
ROUTER.post("/otp", UserValidator.NewOtpValidation, NewOtp);
ROUTER.post("/verify", UserValidator.VerifyUserValidation, VerifyUser);
ROUTER.post("/login", UserValidator.LoginValidation, Login);
ROUTER.get("/self", Auth, GetUser);

export { ROUTER as UserRouter };
