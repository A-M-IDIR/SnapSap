import { Schema, model, Document } from "mongoose";

interface UserDocument extends Document {}

const UserSchema = new Schema<UserDocument>({});

const User = model<UserDocument>("User", UserSchema);

export { User, UserDocument };
