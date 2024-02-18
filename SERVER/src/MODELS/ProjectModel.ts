import { Schema, model, Document } from "mongoose";

interface ProjectDocument extends Document {}

const ProjectSchema = new Schema<ProjectDocument>({});

const Project = model<ProjectDocument>("Project", ProjectSchema);

export { Project, ProjectDocument };
