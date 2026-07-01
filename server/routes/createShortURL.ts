import { TRPCError } from "@trpc/server";
import { authProcedure } from "../middleware/auth";
import {
  createShortURLInputType,
  createShortURLOutputType,
} from "../validation/createShortURL";
import { nanoid } from "nanoid";

export const createShortURL = authProcedure
  .input(createShortURLInputType)
  .output(createShortURLOutputType)
  .mutation(async (opts) => {
    const { input } = opts;
    const uuid = nanoid(10);
    try {
      const response = await opts.ctx.db.url.create({
        data: {
          originalURL: input.originalURL,
          userId: opts.ctx.user.id,
          shortURL: uuid,
        },
        select: {
          shortURL: true,
        },
      });
      return { shortURL: response.shortURL };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Something went wrong while creating short url",
      });
    }
  });
