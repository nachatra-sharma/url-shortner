import { router } from "../config/trpc";
import { createShortURL } from "./createShortURL";
import { getAllShortURL } from "./getAllShortURL";
import { loginRouter } from "./loginRouter";
import { signupRouter } from "./signupRouter";

export const appRouter = router({
  createShortURL: createShortURL,
  getAllShortURL: getAllShortURL,
  signup: signupRouter,
  login: loginRouter,
});

export type AppRouter = typeof appRouter;
