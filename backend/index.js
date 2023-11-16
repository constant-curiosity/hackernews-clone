import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import { expressMiddleware } from "@apollo/server/express4";
import { getUserId } from "./util/authUtils.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { typeDefs } from "./graphql/schema.js";
import { useServer } from "graphql-ws/lib/use/ws";
import { WebSocketServer } from "ws";
import cors from "cors";
import express from "express";
import Link from "./graphql/resolvers/Link.js";
import Mutation from "./graphql/resolvers/Mutation.js";
import Query from "./graphql/resolvers/Query.js";
import subscriptionResolvers from "./graphql/resolvers/Subscription.js";
import User from "./graphql/resolvers/User.js";
import Vote from "./graphql/resolvers/Vote.js";
const port = 4000;
const app = express();
const httpServer = createServer(app);
const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
  Link,
  Mutation,
  Query,
  Subscription: subscriptionResolvers,
  User,
  Vote,
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers,
});

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
  expressMiddleware(apolloServer, {
    context: async ({ req }) => {
      return {
        req,
        prisma,
        pubsub,
        userId: req && req.headers.authorization ? getUserId(req) : null,
      };
    },
    introspection: true,
  })
);

httpServer.listen(port, () => {
  console.log(`🚀 Query endpoint ready at http://localhost:${port}/graphql`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${port}/graphql`
  );
});
