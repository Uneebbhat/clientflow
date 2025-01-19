import dbConnect from "@/config/dbConnect";
import User from "@/model/User.model";
import userSignupSchema from "@/schema/userSignupSchema.schema";
import bcrypt from "bcrypt";
import { DEFAULT_IMG } from "@/config/constants";

import UserDTO from "@/dto/UserDTO.dto";
import ErrorHandler from "@/utils/ErrorHandler";
import ResponseHandler from "@/utils/ResponseHandler";
import jwt from "jsonwebtoken";
import generateToken from "@/utils/generateToken";
import sendEmail from "@/utils/sendEmail";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const validateRequest = userSignupSchema.safeParse(body);

    if (!validateRequest.success) {
      console.log(validateRequest.error.errors);

      const errorMessage = validateRequest.error.errors
        .map((err) => err.message)
        .join(", ");
      return ErrorHandler.send({
        error: errorMessage,
        statusCode: 400,
      });
    }

    const { name, email, password } = validateRequest.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ErrorHandler.send({
        statusCode: 400,
        error: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      profilePic: DEFAULT_IMG as string,
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return ErrorHandler.send({
        error: "Failed to create accoun",
        statusCode: 400,
      });
    }

    const userToken = generateToken(newUser);

    const userDTO = new UserDTO(newUser);

    try {
      await sendEmail({
        to: newUser.email,
        subject: "Welcome to ClientFlow!",
        text: `Hi ${newUser.name},\n\nThank you for signing up for ClientFlow! We're thrilled to have you onboard.\n\nVisit your dashboard: http://localhost:3000/dashboard\n\nFeel free to reply if you have any questions.\n\nCheers, ClientFlow Team`,
        html: `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
            color: #0a0a0a;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 8px;
          }
          .header {
            text-align: center;
            background: #0a0a0a;
            color: #ffffff;
            padding: 15px 0;
            border-radius: 8px 8px 0 0;
          }
          .content {
            padding: 20px;
          }
          .cta-button {
            display: inline-block;
            margin: 20px 0;
            padding: 8px 16px;
            background: #0a0a0a;
            text-decoration: none;
            border-radius: 5px;
            font-size: 14px;
            color: #ffffff !important;
            transition: all 0.3s ease;
          }
          .cta-button:hover {
            background: #030303;
          }
            a {
              color: white !important;
            }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #0a0a0a;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Welcome to ClientFlow!</h1>
          </div>
          <div class="content">
            <p>Hi <b>${newUser.name}</b>,</p>
            <p>Thank you for signing up for <b>ClientFlow</b>! We're thrilled to have you onboard. 🎉</p>
            <p>Click the button below to access your dashboard:</p>
            <a href="http://localhost:3000/dashboard" class="cta-button">Go to Dashboard</a>
            <p>If you have any questions, feel free to reply to this email. We're always here to help!</p>
          </div>
          <div class="footer">
            <p>© 2025 ClientFlow Inc. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,
      });
    } catch (error: any) {
      return ErrorHandler.send({
        error: "Error sending email",
        statusCode: 400,
      });
    }

    return ResponseHandler.send({
      message: "Account created successfully",
      data: userDTO,
      statusCode: 201,
      token: userToken,
    });
  } catch (error: any) {
    console.log("error:", error);
    return ErrorHandler.send({
      error: "Internal Server Error",
      statusCode: 500,
    });
  }
}
