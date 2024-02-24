import { Response, Request } from "express";
import ASYNC_HANDLER from "express-async-handler";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

import { UserModel, UserDocument } from "../MODELS/UserModel.js";
import { OtpModel } from "../MODELS/OptModel.js";

import EmailHandler from "../UTILS/HANDLERS/EmailHandler.js";
import ErrorHandler from "../UTILS/HANDLERS/ErrorHandler.js";
import { TokenHandler } from "../UTILS/HANDLERS/TokenHandler.js";

const Greet = (req: Request, res: Response) => {
  const Response = `
    -------------------------------------------------------------
    WELCOME TO THE USER ROUTE !
    -------------------------------------------------------------
    - Register (POST) :: /register
    - NewOtp (POST) :: /otp
    - VerifyUser (POST) :: /verify
    - Login (POST) :: /login
    - GetUser (GET) :: /self
    -------------------------------------------------------------
  `;

  res.status(200).send(Response);
};

const Register = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { first_name, last_name, user_name, email, password } = req.body;

  const newUser = await UserModel.create({
    first_name,
    last_name,
    user_name,
    email,
    password: await bcrypt.hash(password, 10),
    verified: false,
  });

  const code = v4().slice(0, 5);

  await OtpModel.create({
    userId: newUser._id,
    code: await bcrypt.hash(code, 10),
    createdAt: Date.now(),
    expiresAt: Date.now() + 3600000,
  });

  await EmailHandler(
    email,
    "EMAIL VERIFICATION",
    `Your Verification Code ${code}`
  );

  res.status(200).json({ message: "SUCCESS" });
});

const NewOtp = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    ErrorHandler(res, 404, "User With This Email Doesn't Exist.");
  }

  await OtpModel.deleteMany({ userId: user._id });

  const code = v4().slice(0, 5);

  const opt = await OtpModel.create({
    userId: user._id,
    code: await bcrypt.hash(code, 10),
    createdAt: Date.now(),
    expiresAt: Date.now() + 3600000,
  });

  if (!opt) {
    ErrorHandler(res, 400, "An Error Occured OTP Wasn't Created.");
  }

  await EmailHandler(
    email,
    "EMAIL VERIFICATION",
    `Your Verification Code ${code}`
  );

  res.status(200).json("New OTP Created.");
});

const VerifyUser = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { userId, code } = req.body;

  const Otp = await OtpModel.findOne({ userId: userId });

  if (!Otp) {
    ErrorHandler(res, 404, "OTP Not Found.");
  }

  if (new Date() > Otp.expiresAt) {
    await OtpModel.deleteMany({ userId: userId });

    ErrorHandler(res, 400, "OTP Expired.");
  }

  const VerifyOtp = await bcrypt.compare(code, Otp.code);

  if (!VerifyOtp) {
    ErrorHandler(res, 400, "OTP Incorrect.");
  }

  await UserModel.updateOne({ _id: userId }, { verified: true });
  await OtpModel.deleteMany({ userId: userId });

  res.status(200).json("EMAIL VERIFIED.");
});

const Login = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    ErrorHandler(res, 404, "User With This Email Doesn't Exist.");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    ErrorHandler(res, 400, "Check Your Password.");
  }

  res.status(200).json({
    user,
    token: TokenHandler.Generate(user._id.toString()),
  });
});

const GetUser = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    res.status(200).json(req.user);
  }
);

export { Greet, Register, NewOtp, VerifyUser, Login, GetUser };
