"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useForgotPassword from "@/hooks/useForgotPassword";
import Spinner from "@/components/Spinner";
import useTogglePassword from "@/hooks/useTogglePassword";
import { Eye, EyeClosed } from "lucide-react";
import useResetPassword from "@/hooks/useResetPassword";
import PasswordResetSuccess from "../PasswordResetSuccess";

const ResetPasswordForm = () => {
  const { showPassword, togglePassword } = useTogglePassword();
  const { formData, loading, success, handleOnChange, handleOnSubmit } =
    useResetPassword();

  if (success) {
    return (
      <>
        <PasswordResetSuccess />
      </>
    );
  }
  return (
    <>
      <div className="max-w-full w-[500px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
            <CardDescription>
              Enter your new password and login again
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOnSubmit}>
              <Label htmlFor="password">Password</Label>
              <div className="relative mb-2">
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleOnChange}
                  value={formData.password}
                />
                {showPassword ? (
                  <EyeClosed
                    size={20}
                    className="absolute top-2 right-[10px] cursor-pointer"
                    onClick={togglePassword}
                  />
                ) : (
                  <Eye
                    size={20}
                    className="absolute top-2 right-[10px] cursor-pointer"
                    onClick={togglePassword}
                  />
                )}
              </div>
              <Button
                className="w-full"
                disabled={loading || !formData.password}
              >
                {loading ? (
                  <>
                    <Spinner />
                    Reset password
                  </>
                ) : (
                  "Reset password"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ResetPasswordForm;
