import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Check } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

const PasswordResetSuccess = () => {
  return (
    <section className="min-h-[80vh] flex justify-center items-center p-[20px]">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="flex flex-col items-center">
            <Image
              src="/password-reset.png"
              alt="Password reset successfully"
              width={200}
              height={200}
            />
            <CardTitle>Password Reset Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center flex flex-col gap-2">
              Your password has been reset. Please log in with your new password
              to continue.
              <Link href="/login">
                <Button className="w-full">Login</Button>
              </Link>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PasswordResetSuccess;
