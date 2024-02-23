import { Schema, model, Document } from "mongoose";

interface IssueDocument extends Document {}

const IssueSchema = new Schema<IssueDocument>({});

const IssueModel = model<IssueDocument>("Issue", IssueSchema);

export { IssueModel, IssueDocument };
