import { router } from "../config/trpc";
import { createShortURL } from "./create/createShortURL";
import { loginRouter } from "./create/loginRouter";
import { signupRouter } from "./create/signupRouter";

export const appRouter = router({
  createShortURL: createShortURL,
  signup: signupRouter,
  login: loginRouter,
});

export type AppRouter = typeof appRouter;
