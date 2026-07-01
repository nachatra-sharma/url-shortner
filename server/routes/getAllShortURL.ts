import { TRPCError } from "@trpc/server";
import { authProcedure } from "../middleware/auth";
import { getAllShortURLReturnType } from "../validation/getAllShortURL";

export const getAllShortURL = authProcedure
  .output(getAllShortURLReturnType)
  .query(async (opts) => {
    const { ctx } = opts;
    try {
      const response = await ctx.db.url.findMany({
        where: {
          userId: ctx.user.id,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while fetching all short urls",
      });
    }
  });
