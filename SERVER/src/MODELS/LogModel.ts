import { Schema, model, Document } from "mongoose";

interface LogDocument extends Document {}

const LogSchema = new Schema<LogDocument>({});

const Log = model<LogDocument>("Log", LogSchema);

export { Log, LogDocument };
