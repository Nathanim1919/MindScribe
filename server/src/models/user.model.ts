import { Schema, model, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://i.imgur.com/8cX2j7b.png",
    },
    coverPicture: {
      type: String,
      default: "https://i.imgur.com/8cX2j7b.png",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🔁 Inferred TS type from schema
export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);
