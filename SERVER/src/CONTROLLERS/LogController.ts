import { Response, Request } from "express";
import ASYNC from "express-async-handler";

import { LogModel } from "../MODELS/LogModel.js";
import { ProjectModel } from "../MODELS/ProjectModel.js";
import { IssueModel } from "../MODELS/IssueModel.js";

import ErrorHandler from "../UTILS/HANDLERS/ErrorHandler.js";

const Greet = (req: Request, res: Response) => {
  const Response = `
    -------------------------------------------------------------
    WELCOME TO THE LOG ROUTE !
    ------------------------------------------------------------- 
    - Get (GET) :: /
    - Find (GET) :: /find (logId query)
    - GetDetails (GET) :: /details (logId query)
    - Add (POST) :: /
    - Update (PATCH) :: / (logId query)
    - Delete (DELETE) :: / (logId query)
    -------------------------------------------------------------
  `;

  res.status(200).send(Response);
};

const Get = ASYNC(async (req: Request, res: Response) => {
  const { projectId } = req.query;

  const project = await ProjectModel.findById(projectId);

  if (!project) {
    ErrorHandler(res, 404, "Project Not Found.");
  }

  const logs = await LogModel.find({ project: projectId }).populate(
    "project state"
  );

  res.status(200).send(logs);
});

const Find = ASYNC(async (req: Request, res: Response) => {
  const { sprintId } = req.query;

  const log = await LogModel.findById(sprintId).populate("project state");

  res.status(200).send(log);
});

const GetDetails = ASYNC(async (req: Request, res: Response) => {
  const { logId } = req.query;

  const issues = await IssueModel.find({
    log: logId,
  }).populate("log state project");

  const openIssues = issues.filter(
    (e) => String(e.state._id) != "65f7c14b47ca29e08d705589"
  );

  const closedIssues = issues.filter(
    (e) => String(e.state._id) == "65f7c14b47ca29e08d705589"
  );

  res.status(200).send({
    openIssues,
    closedIssues,
  });
});

const Add = ASYNC(async (req: Request, res: Response) => {
  const { label, project, state, startDate, endDate } = req.body;

  if (!label || label == "") {
    ErrorHandler(res, 400, "Please Provide A Label.");
  }

  // $regex: new RegExp(label, "i"),
  const log = await LogModel.findOne({
    label,
    project,
  });

  if (log) {
    ErrorHandler(res, 400, "Sprint With Same Label Already Exists.");
  }

  if (startDate && endDate) {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);

    const durationInMillis = 30 * 60 * 1000;

    const startDatePlusDuration = new Date(
      newStartDate.getTime() + durationInMillis
    );

    if (startDatePlusDuration > newEndDate) {
      ErrorHandler(res, 400, "Dead-Line Must Be Atleast 30 Minutes Ahead.");
    }
  }

  const newLog = await LogModel.create({
    label,
    project,
    state,
    startDate,
    endDate,
  });
  await newLog.populate("project state");

  res.status(200).send(newLog);
});

const Update = ASYNC(async (req: Request, res: Response) => {
  const { logId } = req.query;
  const { updatedData } = req.body;

  const log = await LogModel.findById(logId);

  if (!log) {
    ErrorHandler(res, 404, "Log Not Found.");
  }

  if (log.isMain) {
    ErrorHandler(res, 400, "Main Log Can't Be Updated.");
  }

  let updatedLog = null;

  if (updatedData.label === "") {
    ErrorHandler(res, 400, "Please Provide A Label.");
  }

  if (updatedData.startDate && log.endDate) {
    const startDate = new Date(updatedData.startDate);
    const endDate = new Date(log.endDate);

    const durationInMillis = 30 * 60 * 1000;

    const startDatePlusDuration = new Date(
      startDate.getTime() + durationInMillis
    );

    if (startDatePlusDuration > endDate) {
      ErrorHandler(res, 400, "Dead-Line Must Be Atleast 30 Minutes Ahead.");
    }
  }

  if (updatedData.endDate && log.startDate) {
    const startDate = new Date(log.startDate);
    const endDate = new Date(updatedData.endDate);

    const durationInMillis = 30 * 60 * 1000;

    const startDatePlusDuration = new Date(
      startDate.getTime() + durationInMillis
    );

    if (startDatePlusDuration > endDate) {
      ErrorHandler(res, 400, "Dead-Line Must Be Atleast 30 Minutes Ahead.");
    }
  }

  if (updatedData.endDate && updatedData.startDate) {
    const startDate = new Date(updatedData.startDate);
    const endDate = new Date(updatedData.endDate);

    const durationInMillis = 30 * 60 * 1000;

    const startDatePlusDuration = new Date(
      startDate.getTime() + durationInMillis
    );

    if (startDatePlusDuration > endDate) {
      ErrorHandler(res, 400, "Dead-Line Must Be Atleast 30 Minutes Ahead.");
    }
  }

  if (!updatedData.state) {
    updatedLog = await LogModel.findByIdAndUpdate(logId, updatedData, {
      new: true,
    }).populate("project state");

    res.status(200).json(updatedLog);
    return;
  }

  if (!log.startDate || !log.endDate) {
    ErrorHandler(res, 400, "Please Set Start & End Dates.");
  }

  updatedLog = await LogModel.findByIdAndUpdate(logId, updatedData, {
    new: true,
  }).populate("project state");

  res.status(200).json(updatedLog);
});

const Delete = ASYNC(async (req: Request, res: Response) => {
  const { logId } = req.query;

  const log = await LogModel.findById(logId);

  if (!log) {
    ErrorHandler(res, 404, "Log Not Found.");
  }

  if (log.isMain) {
    ErrorHandler(res, 400, "Main Log Can't Be Updated.");
  }

  await IssueModel.deleteMany({ log: logId });
  await LogModel.deleteOne({ _id: logId });

  res.status(200).json("LOG DELETED");
});

export { Greet, Get, Find, GetDetails, Add, Update, Delete };
