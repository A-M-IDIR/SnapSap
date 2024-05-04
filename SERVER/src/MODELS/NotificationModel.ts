import { Schema, model, Document } from "mongoose";
import { ProjectDocument } from "./ProjectModel.js";
import { UserDocument } from "./UserModel.js";
import { IssueDocument } from "./IssueModel.js";

interface NotificationDocument extends Document {
  type: string;
  sender: UserDocument;
  receiver: UserDocument;
  project?: ProjectDocument;
  issue?: IssueDocument;
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<NotificationDocument>({
  type: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  issue: { type: Schema.Types.ObjectId, ref: "Issue" },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const NotificationModel = model<NotificationDocument>(
  "Notification",
  NotificationSchema
);

export { NotificationModel, NotificationDocument };
