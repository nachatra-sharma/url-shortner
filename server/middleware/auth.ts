import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../config/trpc";

export const authProcedure = publicProcedure.use(async (opts) => {
  const { ctx } = opts;

  if (!ctx.user?.email) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not logged in" });
  }

  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});
