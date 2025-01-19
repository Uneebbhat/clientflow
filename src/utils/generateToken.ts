import { JWT_TOKEN } from "@/config/constants";
import jwt from "jsonwebtoken";
import ErrorHandler from "./ErrorHandler";

interface GenerateTokenProps {
  _id: unknown;
  name: string;
  email: string;
}

const generateToken = (user: GenerateTokenProps) => {
  if (!JWT_TOKEN) {
    return ErrorHandler.send({
      error: "Token not found",
      statusCode: 404,
    });
  }
  console.log(JWT_TOKEN);

  return jwt.sign(
    {
      userId: user._id,
      name: user.name,
      email: user.email,
    },
    JWT_TOKEN,
    { expiresIn: "30d" }
  );
};

export default generateToken;
