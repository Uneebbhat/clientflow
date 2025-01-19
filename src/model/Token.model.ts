import mongoose, { Document, Model, Schema, Types } from "mongoose";

interface ITokenModel extends Document {
  userId: Types.ObjectId;
  token: string;
  createdAt: Date;
}

const tokenModel: Schema<ITokenModel> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Token: Model<ITokenModel> =
  mongoose.models.Token || mongoose.model<ITokenModel>("Token", tokenModel);

export default Token;
