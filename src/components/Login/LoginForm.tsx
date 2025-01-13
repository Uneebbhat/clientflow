"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import useTogglePassword from "@/hooks/useTogglePassword";
import useLogin from "@/hooks/useLogin";
import Spinner from "@/components/Spinner";

const LoginForm = () => {
  const { showPassword, togglePassword } = useTogglePassword();
  const { formData, loading, error, handleOnChange, handleOnSubmit } =
    useLogin();

  return (
    <>
      <div className="bg-white w-full md:w-1/2 p-[0] md:p-[40px] flex flex-col justify-center min-h-[80vh] md:min-h-[100vh]">
        <div className="mb-4">
          <h4 className="text-h4 text-center text-black-500 font-bold">
            Login to your account
          </h4>
          <h6 className="text-h6 text-gray-200 text-center">
            Enter your credentials below to login
          </h6>
        </div>
        <div className="grid gap-6">
          <form onSubmit={handleOnSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1 mb-2">
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
                />
              </div>
              <div className="grid gap-1 mb-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-medium underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleOnChange}
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
              </div>
              <Button
                disabled={loading || !formData.email || !formData.password}
              >
                {loading ? (
                  <>
                    <Spinner />
                    Login
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <p>
                Don't an account?{" "}
                <Link href="/signup" className="underline">
                  Signup
                </Link>
              </p>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="relative hover:cursor-not-allowed">
            <Badge
              variant="outline"
              className="absolute top-[-5px] right-[-5px] z-20 bg-white"
            >
              Coming soon
            </Badge>
            <Button variant="outline" type="button" className="w-full" disabled>
              <Image src={"/google.png"} alt="Google" width={20} height={20} />
              Google
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
