import { Response, Request } from "express";
import ASYNC_HANDLER from "express-async-handler";

import { UserDocument } from "../MODELS/UserModel.js";
import { GroupModel } from "../MODELS/GroupModel.js";
import ErrorHandler from "../UTILS/HANDLERS/ErrorHandler.js";

const Greet = (req: Request, res: Response) => {
  const Response = `
    -------------------------------------------------------------
    WELCOME TO THE GROUP ROUTE !
    -------------------------------------------------------------
    - GET (POST) :: /get (groupId query)
    - Add (POST) :: /
    - UPDATE (PATCH) :: / (groupId query)
    - DELETE (DELETE) :: / (groupId query)
    -------------------------------------------------------------
  `;

  res.status(200).send(Response);
};

export { Greet };
