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

const ForgotPasswordForm = () => {
  const { formData, loading, handleOnChange, handleOnSubmit } =
    useForgotPassword();
  return (
    <>
      <div className="max-w-full w-[500px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Forgot Password
            </CardTitle>
            <CardDescription>
              Enter your email address to get password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOnSubmit}>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="johndoe@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                onChange={handleOnChange}
                value={formData.email}
                className="mb-2"
              />
              <Button className="w-full" disabled={loading || !formData.email}>
                {loading ? (
                  <>
                    <Spinner />
                    Send Email
                  </>
                ) : (
                  "Send Email"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
