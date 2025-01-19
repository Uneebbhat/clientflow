import crypto from "crypto";
import bcrypt from "bcrypt";
import ErrorHandler from "@/utils/ErrorHandler";
import dbConnect from "@/config/dbConnect";
import User from "@/model/User.model";
import Token from "@/model/Token.model";
import ResponseHandler from "@/utils/ResponseHandler";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const token = req.nextUrl.searchParams.get("token");
    const url = req.url;
    console.log(`url = ${url}`);

    console.log(`backend token: ${token}`);
    const { password } = await req.json();

    if (!token || !password) {
      return ErrorHandler.send({
        error: "Token and password are required",
        statusCode: 400,
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const tokenRecord = await Token.findOne({ token: hashedToken });

    if (!tokenRecord) {
      return ErrorHandler.send({
        error: "Invalid or expired token",
        statusCode: 400,
      });
    }

    const user = await User.findById(tokenRecord.userId);

    if (!user) {
      return ErrorHandler.send({
        error: "User not found",
        statusCode: 404,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await tokenRecord.deleteOne();

    return ResponseHandler.send({
      message: "Password reset successfully",
      statusCode: 200,
      data: {},
      token: null,
    });
  } catch (error: any) {
    console.error("Error in reset password API:", error);
    return ErrorHandler.send({
      error: "Internal Server Error",
      statusCode: 500,
    });
  }
}
