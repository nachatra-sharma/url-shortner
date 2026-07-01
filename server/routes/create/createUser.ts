import { saltRound, SECRET_KEY } from "../../config/serverConfig";
import { publicProcedure } from "../../config/trpc";
import {
  createUserInputType,
  createUserReturnType,
} from "../../validation/createUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRouter = publicProcedure
  .input(createUserInputType)
  .output(createUserReturnType)
  .mutation(async (opts) => {
    const { input, ctx } = opts;
    const isUserAlreadyExist = await ctx.db.user.findUnique({
      where: {
        email: input.email,
      },
    });
    if (isUserAlreadyExist) {
      throw new Error("Email already exist");
    }

    const hashedPassword = await bcrypt.hash(input.password, saltRound);

    const response = await ctx.db.user.create({
      data: {
        email: input.email,
        password: hashedPassword,
      },
      select: {
        email: true,
      },
    });

    const token = jwt.sign(response.email, SECRET_KEY);

    return {
      token,
    };
  });
