import { Response, Request } from "express";
import ASYNC from "express-async-handler";
import mongoose from "mongoose";

import { UserDocument } from "../MODELS/UserModel.js";
import { IssueDocument, IssueModel } from "../MODELS/IssueModel.js";
import { LogModel } from "../MODELS/LogModel.js";
import { ProjectModel } from "../MODELS/ProjectModel.js";
import { StateModel } from "../MODELS/StateModel.js";

import ErrorHandler from "../UTILS/HANDLERS/ErrorHandler.js";

const Greet = (req: Request, res: Response) => {
  const Response = `
    -------------------------------------------------------------
    WELCOME TO THE ISSUE ROUTE !
    ------------------------------------------------------------- 
    - Get (GET) :: /
    - Find (GET) :: /find (issueId query)
    - Add (POST) :: /
    - Update (PATCH) :: / (issueId query)
    - Delete (DELETE) :: / (issueId query)
    - Reorder (POST) :: /reorder 
    - Transfer (POST) :: /transfer 
    - LogInit (POST) :: /init
    -------------------------------------------------------------
  `;

  res.status(200).send(Response);
};

const Get = ASYNC(async (req: Request, res: Response) => {
  const { board, projectId } = req.query;

  let result = null;

  if (board) {
    result = await IssueModel.aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "log",
          foreignField: "_id",
          as: "log",
        },
      },
      {
        $unwind: "$log",
      },
      {
        $match: {
          "log.state": new mongoose.Types.ObjectId("65f7ab3847ca29e08d70557b"),
          project: new mongoose.Types.ObjectId(String(projectId)),
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "log.state",
          foreignField: "_id",
          as: "logState",
        },
      },
      {
        $unwind: "$logState",
      },
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "issueState",
        },
      },
      {
        $unwind: "$issueState",
      },
      {
        $lookup: {
          from: "users",
          localField: "assignees",
          foreignField: "_id",
          as: "assignees",
        },
      },
      { $sort: { boardIndex: -1 } },
    ]);

    res.status(200).send(result);

    return;
  }

  result = await IssueModel.find({ project: projectId })
    .sort({ logIndex: -1 })
    .populate("log assignees");

  res.status(200).send(result);
});

const Filter = ASYNC(async (req: Request, res: Response) => {
  const { board, project, _id } = req.body;

  if (_id) {
    const issue = await IssueModel.findById(_id)
      .populate("log assignees project project state reporter")
      .populate({ path: "project", populate: { path: "members" } });

    if (!issue) {
      ErrorHandler(res, 404, "Issue Not Found.");
    }

    res.status(200).send(issue);

    return;
  }

  let issues = [];

  if (board) {
    const boardFilter: any = {};
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key) && req.body[key]) {
        boardFilter[key] = req.body[key];
      }
    }

    if (boardFilter.summary) {
      boardFilter.summary = { $regex: new RegExp(boardFilter.summary, "i") };
    }

    if (boardFilter.assignees) {
      boardFilter.assignees = new mongoose.Types.ObjectId(
        String(boardFilter.assignees)
      );
    }

    if (boardFilter.log && boardFilter.log.length > 0) {
      boardFilter.log = boardFilter.log.map(
        (logId: any) => new mongoose.Types.ObjectId(String(logId))
      );

      boardFilter["log._id"] = { $in: boardFilter.log };
      delete boardFilter.log;
    }

    boardFilter.project = new mongoose.Types.ObjectId(String(project));
    delete boardFilter.board;

    issues = await IssueModel.aggregate([
      {
        $lookup: {
          from: "logs",
          localField: "log",
          foreignField: "_id",
          as: "log",
        },
      },
      {
        $unwind: "$log",
      },
      {
        $match: {
          "log.state": new mongoose.Types.ObjectId("65f7ab3847ca29e08d70557b"),
          ...boardFilter,
        },
      },
      {
        $lookup: {
          from: "states",
          localField: "log.state",
          foreignField: "_id",
          as: "logState",
        },
      },
      {
        $unwind: "$logState",
      },
      {
        $lookup: {
          from: "states",
          localField: "state",
          foreignField: "_id",
          as: "issueState",
        },
      },
      {
        $unwind: "$issueState",
      },
      {
        $lookup: {
          from: "users",
          localField: "assignees",
          foreignField: "_id",
          as: "assignees",
        },
      },
      { $sort: { boardIndex: -1 } },
    ]);

    res.status(200).send(issues);
    return;
  }

  const logFilter: any = {};
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key) && req.body[key]) {
      logFilter[key] = req.body[key];
    }

    if (logFilter.summary) {
      logFilter.summary = { $regex: new RegExp(logFilter.summary, "i") };
    }
  }

  issues = await IssueModel.find(logFilter)
    .sort({ logIndex: -1 })
    .populate("log assignees project project state reporter")
    .populate({ path: "project", populate: { path: "members" } });

  res.status(200).send(issues);
});

const Add = ASYNC(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { projectId, logId, summary, description, assignees, priority } =
      req.body;

    const project = await ProjectModel.findOne({ _id: projectId });

    if (!project) {
      ErrorHandler(res, 404, "Project Not Found.");
    }

    const log = await LogModel.findOne({ _id: logId }).populate("state");

    if (!log) {
      ErrorHandler(res, 404, "Log Not Found.");
    }

    const lastIssueInLog = await IssueModel.find({ log: logId }).sort({
      logIndex: -1,
    });

    let logIndex = 0;
    if (lastIssueInLog.length > 0) {
      logIndex = Number(lastIssueInLog[0].logIndex + 1);
    }

    let boardIndex = 0;
    if (log.state.label === "STARTED") {
      const startedIssues = await IssueModel.aggregate([
        {
          $lookup: {
            from: "logs",
            localField: "log",
            foreignField: "_id",
            as: "log",
          },
        },
        {
          $unwind: "$log",
        },
        {
          $match: {
            "log.state": new mongoose.Types.ObjectId(
              "65f7ab3847ca29e08d70557b"
            ),
            project: new mongoose.Types.ObjectId(String(projectId)),
          },
        },
        { $sort: { logIndex: -1 } },
      ]);

      if (startedIssues.length > 0) {
        boardIndex = startedIssues[0].boardIndex;
      }
    }

    const newIssue = await IssueModel.create({
      project: projectId,
      log: logId,
      summary,
      description,
      assignees,
      priority,
      reporter: req.user._id,
      logIndex,
      state: "65f7c0ec47ca29e08d705586",
      boardIndex,
    });

    await newIssue.populate("project state log");

    res.status(200).json(newIssue);
  }
);

const Update = ASYNC(
  async (req: Request & { user: UserDocument }, res: Response) => {
    const { issueId, updatedData, addedAssignees, removedAssignees } = req.body;

    const issue = await IssueModel.findById(issueId);

    if (!issue) {
      ErrorHandler(res, 404, "Issue Not Found.");
    }

    if (addedAssignees?.length) {
      addedAssignees.map((newMember: any) => {
        if (issue.assignees.some((member) => String(member) == newMember)) {
          ErrorHandler(res, 400, "This User Is Already A Member");
        }

        issue.assignees.push(newMember);
      });
    }

    if (removedAssignees?.length) {
      issue.assignees = issue.assignees.filter(
        (member) => !removedAssignees.includes(String(member))
      );
    }

    if (updatedData) {
      if (updatedData.state) {
        const newState = await StateModel.findById(updatedData.state);

        if (!newState) {
          ErrorHandler(res, 404, "New State Not Found.");
        }
      }

      Object.assign(issue, updatedData);
    }

    const updatedIssue = await issue.save();
    const populatedIssue = await updatedIssue.populate(
      "reporter assignees state log",
      "-__v"
    );

    res.status(200).json(populatedIssue);
  }
);

const Delete = ASYNC(async (req: Request, res: Response) => {
  const { issueId } = req.query;

  const deletedIssue = await IssueModel.findByIdAndDelete(issueId).populate(
    "log state"
  );

  res.status(200).json(deletedIssue);
});

const Reorder = ASYNC(async (req: Request, res: Response) => {
  const { newOrder, board } = req.body;

  // CHECK IF THE USER TRYING TO ORDER IS PART OF THE PROJECT

  if (board) {
    for (let i = 0; i < newOrder.length; i++) {
      await IssueModel.findByIdAndUpdate(newOrder[i]._id, { boardIndex: i });
    }
  } else {
    for (let i = 0; i < newOrder.length; i++) {
      await IssueModel.findByIdAndUpdate(newOrder[i]._id, { logIndex: i });
    }
  }

  res.status(200).send("REORDERED");
});

const Transfer = ASYNC(async (req: Request, res: Response) => {
  const { issues, logId } = req.body;

  const log = await LogModel.findById(logId);

  if (!log) {
    ErrorHandler(res, 404, "Log Not Found.");
  }

  issues.forEach(async (issue: IssueDocument) => {
    await IssueModel.findByIdAndUpdate(issue._id, { log });
  });

  res.status(200).send("SUCCESS");
});

const LogInit = ASYNC(async (req: Request, res: Response) => {
  const { logId, projectId } = req.body;

  const log = await LogModel.findById(logId).populate("state");
  const project = await ProjectModel.findById(projectId);

  if (!log || !project) {
    ErrorHandler(res, 404, "Log Or Project Not Found.");
  }

  if (log.isMain) {
    ErrorHandler(res, 404, "Board Can't Be Initialized For Main Log.");
  }

  if (log.state.label != "STARTED") {
    await LogModel.findByIdAndUpdate(logId, {
      state: "65f7ab3847ca29e08d70557b",
    });
  }

  const startedSprintAwaitingIssues = await IssueModel.aggregate([
    {
      $lookup: {
        from: "logs",
        localField: "log",
        foreignField: "_id",
        as: "log",
      },
    },
    {
      $unwind: "$log",
    },
    {
      $match: {
        "log.state": new mongoose.Types.ObjectId("65f7ab3847ca29e08d70557b"),
        project: new mongoose.Types.ObjectId(String(projectId)),
        state: new mongoose.Types.ObjectId("65f7c0ec47ca29e08d705586"),
      },
    },
    {
      $lookup: {
        from: "states",
        localField: "log.state",
        foreignField: "_id",
        as: "logState",
      },
    },
    {
      $unwind: "$logState",
    },
    {
      $lookup: {
        from: "states",
        localField: "state",
        foreignField: "_id",
        as: "issueState",
      },
    },
    {
      $unwind: "$issueState",
    },
    {
      $sort: {
        logIndex: -1,
      },
    },
  ]);

  let highestBoardIndex = 0;
  if (startedSprintAwaitingIssues.length > 0) {
    highestBoardIndex = startedSprintAwaitingIssues[0].boardIndex;
  }

  const Issues = await IssueModel.find({ log: logId });

  const updatedIssues = await Promise.all(
    Issues.map(async (issue, index) => {
      const updatedIssue = await IssueModel.findByIdAndUpdate(
        issue._id,
        {
          boardIndex: highestBoardIndex + index + 1,
          state: "65f7c0ec47ca29e08d705586",
        },
        { new: true }
      );
      return updatedIssue;
    })
  );

  res.status(200).send(updatedIssues);
});

export { Greet, Get, Filter, Add, Update, Transfer, Delete, Reorder, LogInit };
