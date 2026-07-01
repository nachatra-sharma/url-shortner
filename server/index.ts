import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes/appRouter";
import { PORT, prisma } from "./config/serverConfig";
import { createContext } from "./context/context";

const server = createHTTPServer({
  router: appRouter,
  createContext,
  middleware: async (req, res, next) => {
    if (req.method === "GET") {
      const code = req.url?.split("/")[1]?.split("?")[0];
      if (code) {
        const record = await prisma.url.findFirst({
          where: {
            shortURL: code,
          },
        });
        if (record) {
          res.writeHead(302, { location: record.originalURL });
          res.end();
          return;
        }
      }
    }
    next();
  },
});

server.listen(PORT);
