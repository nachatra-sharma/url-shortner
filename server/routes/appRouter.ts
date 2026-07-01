import { router } from "../config/trpc";
import { createShortURL } from "./create/createShortURL";
import { userRouter } from "./create/createUser";

export const appRouter = router({
  create: createShortURL,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
