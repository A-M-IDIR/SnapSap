import { Schema, model, Document, Types } from "mongoose";

interface StateDocument extends Document {
  _id: Types.ObjectId;
  label: string;
  isProject: boolean;
  isLog: boolean;
  isIssue: boolean;
}

const StateSchema = new Schema<StateDocument>({
  label: { type: String, required: true },
  isProject: { type: Boolean, default: false },
  isLog: { type: Boolean, default: false },
  isIssue: { type: Boolean, default: false },
});

const StateModel = model<StateDocument>("State", StateSchema);

export { StateModel, StateDocument };
