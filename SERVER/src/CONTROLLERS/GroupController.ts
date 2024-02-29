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

const Get = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { groupId } = req.query;

  if (groupId == "all") {
    const groups = await GroupModel.find({});

    res.status(200).json(groups);
    return;
  }

  const group = await GroupModel.findById(groupId).populate("projects", "-__v");

  if (!group) {
    ErrorHandler(res, 404, "Group not Found.");
  }

  res.status(200).json(group);
});

export { Greet, Get };
