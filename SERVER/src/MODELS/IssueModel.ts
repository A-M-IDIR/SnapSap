import { Schema, model, Document } from "mongoose";
import { LogDocument } from "./LogModel.js";
import { UserDocument } from "./UserModel.js";

interface IssueDocument extends Document {
  index: number;
  log: LogDocument;
  description: string;
  assignees: UserDocument[];
  dueTime: Date;
  priority: number;
  state: string;
}

const IssueSchema = new Schema<IssueDocument>({
  index: { type: Number, required: true },
  log: { type: Schema.Types.ObjectId, ref: "Log" },
  description: { type: String },
  assignees: [{ type: Schema.Types.ObjectId, ref: "Log" }],
  dueTime: Date,
  priority: { type: Number, required: true },
  state: { type: String, required: true },
});

const IssueModel = model<IssueDocument>("Issue", IssueSchema);

export { IssueModel, IssueDocument };
