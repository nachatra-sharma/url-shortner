import { z } from "zod";

export const getAllShortURLReturnType = z.array(
  z.object({
    id: z.number(),
    originalURL: z.url(),
    shortURL: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    userId: z.number(),
  }),
);
