import { z } from "zod";

export const createShortURLInputType = z.object({
  originalURL: z.url(),
});

export const createShortURLOutputType = z.object({
  shortURL: z.url(),
});
