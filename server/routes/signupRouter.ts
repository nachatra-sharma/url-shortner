import { TRPCError } from "@trpc/server";
import { saltRound, SECRET_KEY } from "../config/serverConfig";
import { publicProcedure } from "../config/trpc";
import { signupInputType, signupReturnType } from "../validation/signup";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupRouter = publicProcedure
  .input(signupInputType)
  .output(signupReturnType)
  .mutation(async (opts) => {
    const { input, ctx } = opts;
    try {
      const isUserAlreadyExist = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (isUserAlreadyExist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already exist",
        });
      }

      const hashedPassword = await bcrypt.hash(input.password, saltRound);

      const response = await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });

      const token = jwt.sign(
        { id: response.id, email: response.email },
        SECRET_KEY,
        { expiresIn: "1d" },
      );

      return {
        token,
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong while signup",
      });
    }
  });
