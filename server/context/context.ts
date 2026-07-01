import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { prisma, SECRET_KEY } from "../config/serverConfig";
import jwt from "jsonwebtoken";
export const createContext = async (opts: CreateHTTPContextOptions) => {
  let user: { id: number; email: string } | null = null;
  let token = opts.req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      const payload = jwt.verify(token, SECRET_KEY) as {
        id: number;
        email: string;
      };
      user = {
        id: payload.id,
        email: payload.email,
      };
    } catch (error) {
      user = null;
    }
  }

  return {
    db: prisma,
    user,
  };
};

export type context = Awaited<ReturnType<typeof createContext>>;
