import { z } from "zod";

export const getAllShortURLReturnType = z.array(
  z.object({
    id: z.number(),
    originalURL: z.url(),
    shortURL: z.url(),
  }),
);
