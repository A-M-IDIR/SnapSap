import { Schema, model, Document } from "mongoose";
import { UserDocument } from "./UserModel.js";
import { StateDocument } from "./StateModel.js";

interface ProjectDocument extends Document {
  projectName: string;
  projectImage?: string;
  members: UserDocument[];
  lead: UserDocument;
  state: StateDocument;
}

const ProjectSchema = new Schema<ProjectDocument>({
  projectName: { type: String, required: true },
  projectImage: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  lead: { type: Schema.Types.ObjectId, ref: "User", required: true },
  state: { type: Schema.Types.ObjectId, ref: "State", required: true },
});

const ProjectModel = model<ProjectDocument>("Project", ProjectSchema);

export { ProjectModel, ProjectDocument };
