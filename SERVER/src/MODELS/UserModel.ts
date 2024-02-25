import { Schema, model, Types } from "mongoose";

interface UserDocument {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  verified: boolean;
  avatar?: string;
}

const UserSchema = new Schema<UserDocument>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true },
    avatar: { type: String, required: false },
  },
  { strict: "throw" }
);

const UserModel = model<UserDocument>("User", UserSchema);

export { UserModel, UserDocument };
