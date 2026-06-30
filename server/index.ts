import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes/appRouter.js";
import { PORT } from "./config/serverConfig.js";

const server = createHTTPServer({
  router: appRouter,
});

server.listen(PORT);
