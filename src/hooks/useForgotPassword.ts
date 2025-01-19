"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
interface ForgotPasswordForm {
  email: string;
}

const useForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordForm>({ email: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await axios.post("/api/forgot-password", formData);
      setFormData(response.data);
      console.log(response.data);

      setFormData({ email: "" });

      toast({
        title: `${response.data.message} ${formData.email}`,
      });
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

export default useForgotPassword;
