import { Schema, model, Types } from "mongoose";

interface UserDocument {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  verified: boolean;
  avatar?: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
  },
  { strict: "throw" }
);

const UserModel = model<UserDocument>("User", UserSchema);

export { UserModel, UserDocument };
