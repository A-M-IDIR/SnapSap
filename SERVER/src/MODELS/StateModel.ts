import { Schema, model, Document } from "mongoose";

interface StateDocument extends Document {}

const StateSchema = new Schema<StateDocument>({});

const StateModel = model<StateDocument>("State", StateSchema);

export { StateModel, StateDocument };
