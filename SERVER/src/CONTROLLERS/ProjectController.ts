import { Response, Request } from "express";
import ASYNC_HANDLER from "express-async-handler";

import { ProjectModel } from "../MODELS/ProjectModel.js";
import { StateModel } from "../MODELS/StateModel.js";
import { UserDocument, UserModel } from "../MODELS/UserModel.js";
import ErrorHandler from "../UTILS/HANDLERS/ErrorHandler.js";

const Greet = (req: Request, res: Response) => {
  const Response = `
    -------------------------------------------------------------
    WELCOME TO THE PROJECT ROUTE !
    -------------------------------------------------------------
    - Get (GET) :: /get
    - Add (POST) :: /
    - Update (PATCH) :: / (projectId query)
    - GetStates (GET) :: /state
    -------------------------------------------------------------
  `;

  res.status(200).send(Response);
};

const Get = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const userId = req.user._id;

    const projects = await ProjectModel.find({
      members: { $in: [userId] },
    }).populate("lead members state", "-password -__v -verified");

    res.status(projects.length === 0 ? 204 : 200).json(projects);
  }
);

export { Greet, Get };
