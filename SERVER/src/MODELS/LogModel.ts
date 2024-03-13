import { Schema, model, Document } from "mongoose";
import { ProjectDocument } from "./ProjectModel.js";

interface LogDocument extends Document {
  label: string;
  isMain: boolean;
  project: ProjectDocument;
  status: string;
  dueTime: Date;
}

const LogSchema = new Schema<LogDocument>({
  label: { type: String, required: true },
  isMain: { type: Boolean, default: false },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  status: { type: String, required: true },
  dueTime: Date,
});

const LogModel = model<LogDocument>("Log", LogSchema);

export { LogModel, LogDocument };
