import { Schema, model, Document, Types } from "mongoose";

interface StateDocument extends Document {
  _id: Types.ObjectId;
  label: string;
}

const StateSchema = new Schema<StateDocument>({
  label: { type: String, required: true },
});

const StateModel = model<StateDocument>("State", StateSchema);

export { StateModel, StateDocument };
