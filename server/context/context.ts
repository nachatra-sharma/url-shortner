import type { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { prisma } from "../config/serverConfig";

export const createContext = async (_opts: CreateHTTPContextOptions) => {
  return {
    db: prisma,
  };
};

export type context = Awaited<ReturnType<typeof createContext>>;
