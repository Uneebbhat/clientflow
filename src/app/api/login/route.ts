import ErrorHandler from "@/utils/ErrorHandler";
import generateToken from "@/utils/generateToken";
import ResponseHandler from "@/utils/ResponseHandler";
import dbConnect from "@/config/dbConnect";
import UserDTO from "@/dto/UserDTO.dto";
import User from "@/model/User.model";
import userLoginSchema from "@/schema/userLoginSchema.schema";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();

    const validateRequest = userLoginSchema.safeParse(body);

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

    const { email, password } = validateRequest.data;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return ErrorHandler.send({
        error: "User not found",
        statusCode: 404,
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return ErrorHandler.send({
        error: "Invalid credentials",
        statusCode: 400,
      });
    }

    const userToken = generateToken(existingUser);

    const userDTO = new UserDTO(existingUser);

    return ResponseHandler.send({
      statusCode: 200,
      message: "User logged in successfully",
      data: userDTO,
      token: userToken,
    });
  } catch (error: any) {
    return ErrorHandler.send({
      error: "Internal Server Error",
      statusCode: 500,
    });
  }
}
