import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes/appRouter.js";

const server = createHTTPServer({
  router: appRouter,
});

server.listen(3000);
