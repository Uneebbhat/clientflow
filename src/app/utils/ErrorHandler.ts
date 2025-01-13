import { NextResponse } from "next/server";

interface ErrorHandlerProps {
  error: string;
  statusCode: number;
}

class ErrorHandler {
  static send({ statusCode, error }: ErrorHandlerProps) {
    return NextResponse.json(
      {
        error,
        statusCode,
      },
      { status: statusCode }
    );
  }
}

export default ErrorHandler;
