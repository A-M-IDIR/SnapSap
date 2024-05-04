import { Schema, model, Document } from "mongoose";
import { ProjectDocument } from "./ProjectModel.js";
import { StateDocument } from "./StateModel.js";

interface LogDocument extends Document {
  label: string;
  isMain: boolean;
  project: ProjectDocument;
  state: StateDocument;
  startDate?: Date;
  endDate?: Date;
}

const LogSchema = new Schema<LogDocument>({
  label: { type: String, required: true },
  isMain: { type: Boolean, default: false },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  state: { type: Schema.Types.ObjectId, ref: "State", required: true },
  startDate: Date,
  endDate: Date,
});

const LogModel = model<LogDocument>("Log", LogSchema);

export { LogModel, LogDocument };
