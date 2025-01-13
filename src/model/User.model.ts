import mongoose, { Document, Model, Schema } from "mongoose";

interface IUserModel extends Document {
  profilePic: string;
  name: string;
  email: string;
  password: string;
}

const userModel: Schema<IUserModel> = new Schema(
  {
    profilePic: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserModel> =
  mongoose.models.User || mongoose.model<IUserModel>("User", userModel);

export default User;
