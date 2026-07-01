import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../config/trpc";
import { loginInputType, loginReturnType } from "../../validation/login";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/serverConfig";

export const loginRouter = publicProcedure
  .input(loginInputType)
  .output(loginReturnType)
  .mutation(async (opts) => {
    const { input } = opts;
    try {
      const user = await opts.ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect email or password",
        });
      }
      const isPasswordCorrect = await bcrypt.compare(
        input.password,
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect email or password",
        });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY);

      return {
        token,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong. Please try again.",
      });
    }
  });
