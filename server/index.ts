import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routes/appRouter";
import { PORT, prisma } from "./config/serverConfig";
import { createContext } from "./context/context";

const server = createHTTPServer({
  router: appRouter,
  createContext,
  middleware: async (req, res, next) => {
    if (req.method === "GET") {
      if (req.url?.startsWith("/r/")) {
        const code = req.url?.split("/")[2]?.split("?")[0];
        if (code) {
          const record = await prisma.url.findUnique({
            where: {
              shortURL: code,
            },
          });
          if (record) {
            res.writeHead(302, { location: record.originalURL });
            res.end();
            return;
          } else {
            res.writeHead(404);
            return res.end("Invalid Short ID");
          }
        }
      }
    }
    next();
  },
});

server.listen(PORT);
