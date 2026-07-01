import { z } from "zod";

export const signupInputType = z.object({
  email: z.email(),
  password: z.string().min(10).max(20),
});

export const signupReturnType = z.object({
  token: z.string(),
});
