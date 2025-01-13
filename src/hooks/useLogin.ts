"use client";
import { useState } from "react";

interface SignupForm {
  email: string;
  password: string;
}

const useLogin = () => {
  const [formData, setFormData] = useState<SignupForm>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
      console.log(formData);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useLogin;
