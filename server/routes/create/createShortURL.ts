import { publicProcedure } from "../../config/trpc";
import {
  createShortURLInputType,
  createShortURLOutputType,
} from "../../validation/createShortURL";
import { nanoid } from "nanoid";

export const createShortURL = publicProcedure
  .input(createShortURLInputType)
  .output(createShortURLOutputType)
  .mutation(async (opts) => {
    const { input } = opts;
    const uuid = nanoid();

    const response = await opts.ctx.db.url.create({
      data: {
        originalURL: input.originalURL,
        userId: 123,
        shortURL: `http://localhost/${uuid}`,
      },
    });
    return { shortURL: "https://www.bitly123.com" };
  });
