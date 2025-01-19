import { z } from "zod";

const userSignupSchema = z.object({
  profilePic: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default userSignupSchema;