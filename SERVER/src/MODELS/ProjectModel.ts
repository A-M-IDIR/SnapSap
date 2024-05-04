import { Schema, model, Document } from "mongoose";
import { UserDocument } from "./UserModel.js";
import { StateDocument } from "./StateModel.js";

interface ProjectDocument extends Document {
  projectName: string;
  projectImage?: string;
  projectBanner?: string;
  projectTag?: string;
  description?: string;
  members: UserDocument[];
  lead: UserDocument;
  state: StateDocument;
}

const ProjectSchema = new Schema<ProjectDocument>({
  projectName: { type: String, required: true },
  projectImage: { type: String },
  projectBanner: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1637963953070-e0f3d08da3c1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  projectTag: { type: String, required: false },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  lead: { type: Schema.Types.ObjectId, ref: "User", required: true },
  state: { type: Schema.Types.ObjectId, ref: "State", required: true },
});

const ProjectModel = model<ProjectDocument>("Project", ProjectSchema);

export { ProjectModel, ProjectDocument };
