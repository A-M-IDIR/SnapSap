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
    - GET (GET) :: / (groupId query)
    - Add (POST) :: /
    - UPDATE (PATCH) :: / (groupId query)
    - DELETE (DELETE) :: / (groupId query)
    -------------------------------------------------------------
  `;

  res.status(200).send(Response);
};

const Get = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { groupId } = req.query;

    if (groupId == "all") {
      const groups = await GroupModel.find({ user: req.user._id });

      res.status(200).json(groups);
      return;
    }

    const group = await GroupModel.findOne({
      _id: groupId,
      user: req.user._id,
    }).populate("projects", "-__v");

    if (!group) {
      ErrorHandler(res, 404, "Group Not Found.");
    }

    res.status(200).json(group);
  }
);

const Add = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { label, style, color } = req.body;

    const newGroup = await GroupModel.create({
      label,
      style,
      color,
      user: req.user._id,
    });

    res.status(200).json(newGroup);
  }
);

const Update = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { updatedData, addedProjects, deletedProjects, groupId } = req.body;

    const group = await GroupModel.findById(groupId);

    if (!group) {
      ErrorHandler(res, 404, "Group Not Found.");
    }

    if (String(group.user) != String(req.user._id)) {
      ErrorHandler(res, 401, "You Are Not Authorized To Edit This Group.");
    }

    if (addedProjects?.length) {
      addedProjects.map((newProject: any) => {
        if (group.projects.some((project) => String(project) == newProject)) {
          ErrorHandler(res, 400, "Project Already In The Group.");
        }

        group.projects.push(newProject);
      });
    }

    if (deletedProjects?.length > 0) {
      group.projects = group.projects.filter(
        (project) => !deletedProjects.includes(String(project))
      );
    }

    if (updatedData) {
      Object.assign(group, updatedData);
    }

    const updatedGroup = await group.save();

    const populatedGroup = await updatedGroup.populate(
      "projects user",
      "-password -verified -__v"
    );

    res.status(200).json(populatedGroup);
  }
);

const Delete = ASYNC_HANDLER(async (req: Request, res: Response) => {
  const { groupId } = req.query;

  const group = await GroupModel.findByIdAndDelete(groupId);

  if (!group) {
    ErrorHandler(res, 404, "Group Not Found.");
  }

  res.status(200).json("GROUP DELETED");
});

export { Greet, Get, Add, Update, Delete };
