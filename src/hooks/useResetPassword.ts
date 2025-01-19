import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

interface ResetPassword {
  password: string;
}

const useResetPassword = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<ResetPassword>({
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return {
      formData,
      loading,
      success,
      handleOnChange: () => {},
      handleOnSubmit: () => {},
    };
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast({
        title: "Token is required",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`/api/reset-password?token=${token}`, {
        password: formData.password,
      });

      setSuccess(true);
      setFormData({
        password: "",
      });
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: error.response?.data?.error || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    success,
    handleOnChange,
    handleOnSubmit,
  };
};

export default useResetPassword;
