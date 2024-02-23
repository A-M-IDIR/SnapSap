import { Schema, model, Document } from "mongoose";

interface ProjectDocument extends Document {}

const ProjectSchema = new Schema<ProjectDocument>({});

const ProjectModel = model<ProjectDocument>("Project", ProjectSchema);

export { ProjectModel, ProjectDocument };
