import { publicProcedure, router } from "../config/trpc.js";
import { getAllShortURLReturnType } from "../validation/getAllShortURL.js";

export const appRouter = router({
  getAllShortURL: publicProcedure
    .output(getAllShortURLReturnType)
    .query(async (opts) => {
      // db call
      return [
        {
          id: 1,
          originalURL: "https://www.google.com",
          shortURL: "http://localhost:3000/asdf",
        },
      ];
    }),
});

export type AppRouter = typeof appRouter;
