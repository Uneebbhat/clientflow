import dbConnect from "@/config/dbConnect";
import User from "@/model/User.model";
import userSchema from "@/schema/userSchema.schema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { DEFAULT_IMG } from "@/config/constants";
import UserDTO from "@/dto/UserDTO.dto";
import ErrorHandler from "@/app/utils/ErrorHandler";
import ResponseHandler from "@/app/utils/ResponseHandler";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const validateRequest = userSchema.safeParse(body);

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

    const userDTO = new UserDTO(newUser);

    return ResponseHandler.send({
      message: "Account created successfully",
      data: userDTO,
      statusCode: 201,
      token: null,
    });
  } catch (error: any) {
    console.log("error:", error);
    return ErrorHandler.send({
      error: "Internal Server Error",
      statusCode: 500,
    });
  }
}
