import { Request, Response, NextFunction } from "express";

import { UserModel, UserDocument } from "../../MODELS/UserModel.js";

import ErrorHandler from "../HANDLERS/ErrorHandler.js";
import { TokenHandler } from "../HANDLERS/TokenHandler.js";
import ASYNC_HANDLER from "express-async-handler";

interface AuthRequest extends Request {
  user?: UserDocument;
}

export const Auth = ASYNC_HANDLER(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = TokenHandler.Split(req);

    if (!token) {
      ErrorHandler(res, 401, "Unauthorized :: Token not found.");
    }

    try {
      const decodedToken = TokenHandler.Decrypt(token);

      const user = await UserModel.findById(decodedToken.id);

      if (!user) {
        ErrorHandler(res, 401, "Unauthorized :: User not found.");
      }

      req.user = user;
      next();
    } catch (error) {
      ErrorHandler(res, 401, "Unauthorized :: Invalid or expired token.");
    }
  }
);
