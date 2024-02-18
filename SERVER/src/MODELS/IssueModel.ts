import { Schema, model, Document } from "mongoose";

interface IssueDocument extends Document {}

const IssueSchema = new Schema<IssueDocument>({});

const Issue = model<IssueDocument>("Issue", IssueSchema);

export { Issue, IssueDocument };
