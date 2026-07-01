import { z } from "zod";

export const createUserInputType = z.object({
  email: z.email(),
  password: z.string().min(10).max(20),
});

export const createUserReturnType = z.object({
  token: z.string(),
});
