"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser } = useUserStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/login", formData);

      const { _id, name, email, profilePic } = response.data.data;
      setUser({
        id: _id,
        name,
        email,
        profilePic,
        token: response.data.token,
      });
      toast({
        title: "Logged in successfully",
        variant: "default",
      });

      setFormData({
        email: "",
        password: "",
      });

      router.push("/dashboard");
    } catch (error: any) {
      // console.log(error);
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useLogin;
