import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { PubSub } from "graphql-subscriptions";
import http from "http";
import express from "express";
import cors from "cors";
import { typeDefs } from "./graphql/schema.js";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "./util/authUtils.js";
import Query from "./graphql/resolvers/Query.js";
import Mutation from "./graphql/resolvers/Mutation.js";
import User from "./graphql/resolvers/User.js";
import Link from "./graphql/resolvers/Link.js";
import Subscription from "./graphql/resolvers/Subscription.js";
const app = express();
const httpServer = http.createServer(app);
const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
};
const schema = makeExecutableSchema({ typeDefs, resolvers });
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/subscriptions",
});
const serverCleanup = useServer({ schema }, wsServer);

const pubsub = new PubSub();
const prisma = new PrismaClient();
const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            serverCleanup();
          },
        };
      },
    },
  ],
});
await server.start();

app.use(
  "/",
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      return {
        ...req,
        prisma,
        pubsub,
        userId: req && req.headers.authorization ? getUserId(req) : null,
      };
    },
  })
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
