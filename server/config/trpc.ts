import { initTRPC } from "@trpc/server";
import type { context } from "../context/context";

const t = initTRPC.context<context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;
