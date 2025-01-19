import dbConnect from "@/config/dbConnect";
import User from "@/model/User.model";
import ErrorHandler from "@/utils/ErrorHandler";
import crypto from "crypto";
import sendEmail from "@/utils/sendEmail";
import Token from "@/model/Token.model";
import ResponseHandler from "@/utils/ResponseHandler";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { email } = await req.json();

    if (!email) {
      return ErrorHandler.send({
        error: "Email is required",
        statusCode: 400,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return ErrorHandler.send({
        error: "User not found",
        statusCode: 404,
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const existingToken = await Token.findOne({ userId: user._id });
    if (existingToken) {
      await existingToken.deleteOne();
    }

    await Token.create({
      userId: user._id,
      token: hashedToken,
      createdAt: new Date(),
    });

    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      text: `You requested to reset your password. Click the link below to reset it: ${resetUrl}`,
      html: `
        <div style="font-family: inter, sans-serif; text-align: center; max-width: 600px; margin: 20px auto;">
          <h2>Password Reset Request</h2>
          <p>Hi <b>${user.name}</b>,</p>
          <p>You requested to reset your password. Click the button below to reset it:</p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; color: #ffffff; background: #0a0a0a; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Thanks,<br />The ClientFlow Team</p>
        </div>
      `,
    });

    return ResponseHandler.send({
      message: "Reset password email sent successfully",
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
