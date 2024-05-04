import { Schema, model, Types } from "mongoose";

interface UserDocument {
  _id: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  avatar?: string;
  banner?: string;
  verified: boolean;
}

const UserSchema = new Schema<UserDocument>(
  {
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    banner: { type: String, required: false },
    verified: { type: Boolean, required: true, default: false },
  },
  { strict: "throw" }
);

const UserModel = model<UserDocument>("User", UserSchema);

export { UserModel, UserDocument };
