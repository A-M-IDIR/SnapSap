import { Response, Request } from "express";
import ASYNC_HANDLER from "express-async-handler";

import { ProjectModel } from "../MODELS/ProjectModel.js";
import { UserDocument, UserModel } from "../MODELS/UserModel.js";
import { LogModel } from "../MODELS/LogModel.js";
import { IssueModel } from "../MODELS/IssueModel.js";
import { StateModel } from "../MODELS/StateModel.js";
import { GroupModel } from "../MODELS/GroupModel.js";
import { NotificationModel } from "../MODELS/NotificationModel.js";

import ErrorHandler from "../UTILS/HANDLERS/ErrorHandler.js";

const Greet = (req: Request, res: Response) => {
  const Response = `
    -------------------------------------------------------------
    WELCOME TO THE PROJECT ROUTE !
    -------------------------------------------------------------
    - Get (GET) :: /
    - GetDetails (GET) :: / detail (projectId query)
    - Find (GET) :: /find (projectId query)
    - Add (POST) :: /
    - Update (PATCH) :: / (projectId query)
    - Delete (DELETE) :: / (projectId query)
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

    res.status(200).json(projects);
  }
);

const GetDetails = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { projectId } = req.query;

    const project = await ProjectModel.find({
      _id: projectId,
      members: { $in: [req.user._id] },
    });

    if (!project) {
      ErrorHandler(res, 404, "Project Not Found.");
    }

    let projectDetails = null;

    const issues = await IssueModel.find({ project: projectId });
    const logs = await LogModel.find({ project: projectId });

    projectDetails = {
      issues,
      logs,
    };

    res.status(200).json(projectDetails);
  }
);

const Filter = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { group, projectName, projectId } = req.body;

    if (projectId) {
      const project = await ProjectModel.findOne({
        _id: projectId,
        members: { $in: [req.user._id] },
      }).populate("lead members state", "-password -__v -verified");

      if (!project) {
        ErrorHandler(res, 404, "Project Not Found.");
      }

      const group = await GroupModel.findOne({
        projects: projectId,
        user: req.user._id,
      });

      const groups = await GroupModel.find({ user: req.user._id });

      const populatedProject = { ...project.toObject(), group, groups };

      res.status(200).json(populatedProject);

      return;
    }

    if (!group) {
      const projectFilter: any = { members: { $in: [req.user._id] } };
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key) && req.body[key]) {
          projectFilter[key] = req.body[key];
        }
      }

      if (projectFilter.projectName) {
        projectFilter.projectName = {
          $regex: new RegExp(projectFilter.projectName, "i"),
        };
      }

      const projects = await ProjectModel.find(projectFilter).populate(
        "lead members state",
        "-password -__v -verified"
      );

      res.status(200).json(projects);

      return;
    }

    let projects = [];

    const promises = group.map(async (groupId) => {
      const theGroup = await GroupModel.findById(groupId).populate({
        path: "projects",
        populate: {
          path: "state",
        },
      });

      return theGroup.projects;
    });

    Promise.all(promises)
      .then((results) => {
        projects = results.flat();

        if (!projectName) {
          res.status(200).json(projects);

          return;
        }

        res
          .status(200)
          .json(
            projects.filter((e) =>
              e.projectName.toLowerCase().includes(projectName.toLowerCase())
            )
          );
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      });
  }
);

const Join = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { projectId } = req.body;

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      ErrorHandler(res, 404, "Project Not Found.");
    }

    if (
      project.members.some((member) => String(member) == String(req.user._id))
    ) {
      ErrorHandler(res, 404, "Already A Member.");
    }

    const prevRequest = await NotificationModel.findOne({
      type: "request",
      receiver: project.lead,
      project: project._id,
    });

    if (prevRequest) {
      ErrorHandler(res, 404, "Already Sent.");
    }

    await NotificationModel.create({
      type: "request",
      sender: req.user._id,
      receiver: project.lead,
      project: project._id,
    });

    res.status(200).json({ message: "Request Sent !" });
  }
);

const Add = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const {
      projectName,
      projectTag,
      description,
      projectImage,
      projectBanner,
      stateId,
      group,
    } = req.body;

    const leadUser = req.user;

    const state = await StateModel.findById(stateId);

    if (!state) {
      ErrorHandler(res, 404, "State Not Found.");
    }

    const generatedTag = projectName.slice(0, 3).toUpperCase();

    const newProject = await ProjectModel.create({
      projectTag: projectTag
        ? projectTag.toUpperCase()
        : generatedTag.toUpperCase(),
      lead: leadUser._id,
      members: [leadUser._id],
      state: stateId,
      projectName,
      description,
      projectImage,
      projectBanner,
    });
    await newProject.populate("lead members state", "-password -__v -verified");

    await LogModel.create({
      label: "BACK_LOG",
      project: newProject._id,
      state: "65f7ab2b47ca29e08d70557a",
      isMain: true,
    });

    if (group) {
      let updatedGroup = await GroupModel.findById(group);

      updatedGroup.projects.push(newProject._id);

      await updatedGroup.save();
    }

    res.status(200).json(newProject);
  }
);

const Update = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { addedMembers, deletedMembers } = req.body;
    let { updatedData, projectId } = req.body;

    const project = await ProjectModel.findOne({
      _id: projectId,
      members: { $in: [req.user._id] },
    });

    if (!project) {
      ErrorHandler(res, 404, "Project Not Found.");
    }

    if (String(req.user._id) != String(project.lead)) {
      ErrorHandler(res, 400, "Only The Lead Can Perform This Action.");
    }

    if (addedMembers?.length) {
      addedMembers.map((newMember: any) => {
        if (project.members.some((member) => String(member) == newMember)) {
          ErrorHandler(res, 400, "This User Is Already A Member");
        }

        project.members.push(newMember);
      });
    }

    if (deletedMembers?.length) {
      deletedMembers.forEach(async (deletedMember: any) => {
        if (String(deletedMember) === String(project.lead)) {
          ErrorHandler(res, 400, "Can't Remove Lead From Members.");
        }

        project.members = project.members.filter(
          (member) => !deletedMembers.includes(String(member))
        );

        const issues = await IssueModel.find({
          project: projectId,
          assignees: { $in: [deletedMember] },
        });

        await Promise.all(
          issues.map(async (issue) => {
            issue.assignees = issue.assignees.filter(
              (assignee) => String(assignee._id) != String(deletedMember)
            );

            await issue.save();
          })
        );
      });
    }

    if (updatedData) {
      if (updatedData.lead) {
        const newLead = await UserModel.findById(updatedData.lead);

        if (!newLead) ErrorHandler(res, 404, "New Lead Not Found.");

        if (
          !project.members.some(
            (member) => String(member) == String(newLead._id)
          )
        ) {
          ErrorHandler(res, 400, "User Must Be A Member To Be A Lead.");
        }
      }

      if (updatedData.state) {
        const newState = await StateModel.findById(updatedData.state);

        if (!newState) {
          ErrorHandler(res, 404, "New State Not Found.");
        }
      }

      // if (updatedData.projectName && !updatedData.projectTag) {
      //   const projectTag = updatedData.projectName.slice(0, 4);

      //   updatedData = { ...updatedData, projectTag };
      // }

      Object.assign(project, updatedData);
    }

    const updatedProject = await project.save();

    const populatedProject = await updatedProject.populate(
      "lead members state",
      "-password -__v -verified"
    );

    res.status(200).json(populatedProject);
  }
);

const Delete = ASYNC_HANDLER(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { projectId } = req.body;

    const project = await ProjectModel.findOne({
      _id: projectId,
      members: { $in: [req.user._id] },
    });

    if (!project) {
      ErrorHandler(res, 404, "Project Not Found.");
    }

    const groups = await GroupModel.find({
      user: req.user._id,
      projects: { $in: [projectId] },
    });

    await Promise.all(
      groups.map(async (group) => {
        group.projects = group.projects.filter(
          (project) => String(project._id) != String(projectId)
        );

        await group.save();
      })
    );

    if (String(req.user._id) != String(project.lead)) {
      project.members = project.members.filter(
        (member) => String(member) != String(req.user._id)
      );

      await project.save();

      const issues = await IssueModel.find({
        project: projectId,
        assignees: { $in: [req.user._id] },
      });

      await Promise.all(
        issues.map(async (issue) => {
          issue.assignees = issue.assignees.filter(
            (assignee) => String(assignee._id) != String(req.user._id)
          );

          await issue.save();
        })
      );

      res.status(200).json("LEFT THE PROJECT.");

      return;
    }

    const logs = await LogModel.find({ project: projectId });

    await Promise.all(
      logs.map(async (log) => {
        await IssueModel.deleteMany({ log: log._id });

        await LogModel.deleteOne({ _id: log._id });
      })
    );

    await project.deleteOne();

    res.status(200).json("PROJECT DELETED");
  }
);

export { Greet, Get, GetDetails, Filter, Join, Add, Update, Delete };
