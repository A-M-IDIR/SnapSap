import { Schema, model, Document } from "mongoose";
import { ProjectDocument } from "./ProjectModel.js";
import { UserDocument } from "./UserModel.js";

interface GroupDocument extends Document {
  label: string;
  style: number;
  color: string;
  user: UserDocument;
  projects?: ProjectDocument[];
}

const GroupSchema = new Schema<GroupDocument>({
  label: { type: String, required: true },
  style: { type: Number, required: true },
  color: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
});

const GroupModel = model<GroupDocument>("Group", GroupSchema);

export { GroupModel, GroupDocument };
