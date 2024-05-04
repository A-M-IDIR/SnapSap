import { Response, Request } from "express";
import ASYNC_HANDLER from "express-async-handler";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

import { UserModel, UserDocument } from "../MODELS/UserModel.js";
import { OtpModel } from "../MODELS/OtpModel.js";
import { NotificationModel } from "../MODELS/NotificationModel.js";

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
    - Verify (POST) :: /verify
    - Login (POST) :: /login
    - GetUser (GET) :: /
    - UpdateUser (PATCH) :: /
    - GetInbox (GET) :: /inbox
    - DeleteInbox (DELETE) :: /inbox
    -------------------------------------------------------------
  `;

  res.status(200).send(Response);
};

const Register = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  const user = await UserModel.findOne({ userName });

  if (user) {
    ErrorHandler(res, 400, "User-Name Already In Use.");
  }

  const newUser = await UserModel.create({
    userName,
    email,
    password: await bcrypt.hash(password, 10),
    verified: false,
  });

  const code = v4().slice(0, 5);

  const otpLife = 3600000; // SET THIS TO A DURATION IN MS IF NEEDED
  const expiresAt = null; // SET THIS TO Date.now() + otpLife IF NEEDED

  const otp = await OtpModel.create({
    userId: newUser._id,
    code: await bcrypt.hash(code, 10),
    createdAt: Date.now(),
    expiresAt,
  });

  if (!otp) {
    ErrorHandler(res, 400, "An Error Occured OTP Wasn't Created.");
  }

  const emailContent = `
  <p>Click the link below to verify your account:</p>
  <a href="${process.env.SERVER_URL}?otp=${code}&user=${newUser._id}">Verify Account</a>
`;

  EmailHandler(email, "Verify Your Account", emailContent);

  res
    .status(200)
    .json({ message: "Account Created Successfully.", userId: newUser._id });
});

const NewOtp = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    ErrorHandler(res, 404, "User With This Email Doesn't Exist.");
  }

  await OtpModel.deleteMany({ userId: user._id });

  const code = v4().slice(0, 5);

  const otpLife = 3600000; // SET THIS TO A DURATION IN MS IF NEEDED
  const expiresAt = null; // SET THIS TO Date.now() + otpLife IF NEEDED

  const otp = await OtpModel.create({
    userId: user._id,
    code: await bcrypt.hash(code, 10),
    createdAt: Date.now(),
    expiresAt,
  });

  if (!otp) {
    ErrorHandler(res, 400, "An Error Occured OTP Wasn't Created.");
  }

  await EmailHandler(
    email,
    "EMAIL VERIFICATION",
    `Your Verification Code ${code}`
  );

  res.status(200).json("New OTP Created.");
});

const Verify = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { userId, code } = req.body;

  const user = await UserModel.findById(userId);

  if (user.verified) {
    ErrorHandler(res, 400, "Already Verified.");
  }

  const otp = await OtpModel.findOne({ userId: userId });

  if (!otp) {
    ErrorHandler(res, 404, "Code Not Found.");
  }

  if (otp.expiresAt && new Date() > otp.expiresAt) {
    await OtpModel.deleteMany({ userId: userId });

    ErrorHandler(res, 400, "Code Expired.");
  }

  const verifyOtp = await bcrypt.compare(code, otp.code);

  if (!verifyOtp) {
    ErrorHandler(res, 400, "Code Incorrect.");
  }

  await UserModel.updateOne({ _id: userId }, { verified: true });
  await OtpModel.deleteMany({ userId: userId });

  res.status(200).json("Your Account Is Verified.");
});

const Login = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email: email.toLowerCase(),
  });

  if (!user) {
    ErrorHandler(res, 404, "Please Check Your Email.");
  }

  if (!user.verified) {
    ErrorHandler(res, 400, "Please Verify Your Account.");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    ErrorHandler(res, 400, "Please Check Your Password.");
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

const UpdateUser = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { updatedData, currentPassword } = req.body;

    if (
      (updatedData.userName || updatedData.email || updatedData.password) &&
      !currentPassword
    ) {
      ErrorHandler(res, 400, "Please Provide Your Password.");
    }

    if (
      currentPassword &&
      !(await bcrypt.compare(currentPassword, req.user.password))
    ) {
      ErrorHandler(res, 400, "Please Check Your Password.");
    }

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  }
);

const GetInbox = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const notifications = await NotificationModel.find({
      receiver: req.user._id,
    }).populate("sender receiver project issue");

    res.status(200).json(notifications);
  }
);

const OpenInbox = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    await NotificationModel.updateMany(
      { receiver: req.user._id },
      { isRead: true }
    );

    res.status(200).json({ message: "OPENED" });
  }
);

const DeleteInbox = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { inboxes } = req.body;

    for (const inbox of inboxes) {
      await NotificationModel.deleteOne({ _id: inbox });
    }

    res.status(200).json({ message: "DELETED" });
  }
);

export {
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
};
