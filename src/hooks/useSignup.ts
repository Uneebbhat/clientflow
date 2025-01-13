"use client";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "@/store/useUserStore";
import { useRouter } from "next/navigation";

interface SignupForm {
  name: string;
  email: string;
  password: string;
}

const useSignup = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SignupForm>({
    name: "",
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
      const response = await axios.post("/api/signup", formData);
      const { _id, name, email, profilePic } = response.data.data;
      console.log(response.data);
      toast({
        title: response.data.message,
      });

      setUser({
        id: _id,
        name,
        email,
        profilePic,
        token: response.data.token,
      });
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      router.push("/dashboard");
    } catch (error: any) {
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

export default useSignup;
