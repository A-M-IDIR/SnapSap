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

const Add = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { projectName, stateId } = req.body;

    const leadUser = req.user;

    const newProject = await ProjectModel.create({
      projectName,
      lead: leadUser._id,
      members: [leadUser._id],
      state: stateId,
    });

    res.status(200).json(newProject);
  }
);

const Update = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { projectId } = req.query;
    const { updatedData, addedMembers, deletedMembers } = req.body;

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      ErrorHandler(res, 404, "Project not found.");
    }

    if (String(req.user._id) != String(project.lead)) {
      ErrorHandler(res, 400, "Only lead can edit the project.");
    }

    if (addedMembers?.length) {
      addedMembers.map((newMember) => {
        if (project.members.some((member) => String(member) == newMember)) {
          ErrorHandler(res, 400, "User already a member.");
        }

        project.members.push(newMember);
      });
    }

    if (deletedMembers?.length) {
      deletedMembers.forEach((deletedMember) => {
        if (String(deletedMember) === String(project.lead)) {
          ErrorHandler(res, 400, "Can't remove lead from members.");
        }

        project.members = project.members.filter(
          (member) => !deletedMembers.includes(String(member))
        );
      });
    }

    if (updatedData) {
      if (updatedData.lead) {
        const newLead = await UserModel.findById(updatedData.lead);

        if (!newLead)
          ErrorHandler(res, 404, "User not found can't update lead.");

        if (
          !project.members.some(
            (member) => String(member) == String(newLead._id)
          )
        ) {
          ErrorHandler(
            res,
            400,
            "User must be a member of the project to be a lead."
          );
        }
      }

      Object.assign(project, updatedData);
    }

    const updatedProject = await project.save();

    const populatedProject = await updatedProject.populate(
      "lead members",
      "-password -__v -verified"
    );

    res.status(200).json(populatedProject);
  }
);

export { Greet, Get, Add, Update };
