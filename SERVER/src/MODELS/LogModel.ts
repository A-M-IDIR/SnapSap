import { Schema, model, Document } from "mongoose";

interface LogDocument extends Document {}

const LogSchema = new Schema<LogDocument>({});

const LogModel = model<LogDocument>("Log", LogSchema);

export { LogModel, LogDocument };
