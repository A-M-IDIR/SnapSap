import { Schema, model, Document } from "mongoose";
import { LogDocument } from "./LogModel.js";
import { UserDocument } from "./UserModel.js";

interface IssueDocument extends Document {
  log: LogDocument;
  description: string;
  assignees: UserDocument[];
  dueTime: Date;
  priority: number;
  state: string;
  logIndex: number;
  boardIndex: number;
}

const IssueSchema = new Schema<IssueDocument>({
  log: { type: Schema.Types.ObjectId, ref: "Log" },
  description: { type: String },
  assignees: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dueTime: Date,
  priority: { type: Number, default: 0 },
  state: { type: String, default: "AWAITING", required: true },
  logIndex: { type: Number, default: 0 },
  boardIndex: { type: Number, default: 0 },
});

const IssueModel = model<IssueDocument>("Issue", IssueSchema);

export { IssueModel, IssueDocument };
