import EXPRESS from "express";
import { UserValidator } from "../VALIDATORS/UserValidator.js";
import { Auth } from "../UTILS/MIDDLEWARES/Auth.js";

import {
  Greet,
  Register,
  NewOtp,
  Verify,
  Login,
  GetUser,
  UpdateUser,
  GetInbox,
  OpenInbox,
  DeleteInbox,
} from "../CONTROLLERS/UserController.js";

const ROUTER = EXPRESS.Router();

ROUTER.get("/info", Greet);

ROUTER.post("/register", UserValidator.RegisterValidation, Register);
ROUTER.post("/otp", UserValidator.NewOtpValidation, NewOtp);
ROUTER.post("/verify", UserValidator.VerifyUserValidation, Verify);
ROUTER.post("/login", UserValidator.LoginValidation, Login);

ROUTER.get("/", Auth, GetUser);
ROUTER.patch("/", Auth, UserValidator.UpdateUserValidation, UpdateUser);

ROUTER.get("/inbox", Auth, GetInbox);
ROUTER.get("/inbox/open", Auth, OpenInbox);
ROUTER.delete("/inbox", Auth, DeleteInbox);

export { ROUTER as UserRouter };
