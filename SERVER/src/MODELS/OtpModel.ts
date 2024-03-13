import { Schema, model, Document } from "mongoose";

interface OtpDocument extends Document {
  userId: string;
  code: string;
  createdAt: Date;
  expiresAt: Date;
}

const OtpSchema = new Schema<OtpDocument>({
  userId: { type: "String", required: true, unique: true },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: Date,
  expiresAt: Date,
});

const OtpModel = model<OtpDocument>("Otp", OtpSchema);

export { OtpModel, OtpDocument };
