import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { getUserIdFromToken } from "./util/authUserId.js";
import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import schema from "./graphql/schema/schemaExecutable.js";
const app = express();
const httpServer = createServer(app);
const port = 4000;
const prisma = new PrismaClient();
const pubsub = new PubSub();

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const wsServerCleanup = useServer(
  {
    schema,
    context: {
      prisma,
      pubsub,
    },
  },
  wsServer
);

const apolloServer = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await wsServerCleanup.dispose();
          },
        };
      },
    },
  ],
});
await apolloServer.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  cookieParser(),
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => {
      const userId = getUserIdFromToken(req);
      return {
        req,
        res,
        prisma,
        pubsub,
        userId,
      };
    },
    introspection: true,
  })
);

httpServer.listen(port, () => {
  console.log(`Query endpoint ready at http://localhost:${port}/graphql`);
  console.log(`Subscription endpoint ready at ws://localhost:${port}/graphql`);
});
