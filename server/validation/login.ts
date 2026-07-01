import { z } from "zod";

export const loginInputType = z.object({
  email: z.email(),
  password: z.string().min(10).max(20),
});

export const loginReturnType = z.object({
  token: z.string(),
});
