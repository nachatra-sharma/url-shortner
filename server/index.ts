import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes/appRouter";
import { PORT } from "./config/serverConfig";
import { createContext } from "./context/context";

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

server.listen(PORT);
