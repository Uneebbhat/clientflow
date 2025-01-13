import { NextResponse } from "next/server";

interface ResponseHandlerProps {
  statusCode: number;
  message: string;
  data: {};
  token: {} | null;
}

class ResponseHandler {
  static send({ statusCode, message, data, token }: ResponseHandlerProps) {
    return NextResponse.json(
      {
        message,
        data,
        statusCode,
        token,
      },
      { status: statusCode }
    );
  }
}

export default ResponseHandler;
