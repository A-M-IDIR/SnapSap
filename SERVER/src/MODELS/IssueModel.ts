import { Schema, model, Document } from "mongoose";
import { LogDocument } from "./LogModel.js";
import { UserDocument } from "./UserModel.js";
import { StateDocument } from "./StateModel.js";
import { ProjectDocument } from "./ProjectModel.js";

interface IssueDocument extends Document {
  project: ProjectDocument;
  log: LogDocument;
  summary?: string;
  description?: string;
  assignees?: UserDocument[];
  reporter: UserDocument;
  priority?: number;
  estimate?: number;
  timeSpent?: number;
  state: StateDocument;
  logIndex?: number;
  boardIndex?: number;
}

const IssueSchema = new Schema<IssueDocument>({
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  log: { type: Schema.Types.ObjectId, ref: "Log", required: true },
  summary: { type: String },
  description: { type: String },
  assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
  priority: { type: Number, default: 0 },
  estimate: { type: Number, default: 0 },
  timeSpent: { type: Number, default: 0 },
  state: { type: Schema.Types.ObjectId, ref: "State", required: true },
  logIndex: { type: Number, default: 0 },
  boardIndex: { type: Number, default: 0 },
});

const IssueModel = model<IssueDocument>("Issue", IssueSchema);

export { IssueModel, IssueDocument };
