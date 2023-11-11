import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
// import { PubSub } from "graphql-subscriptions";
import { typeDefs } from "./graphql/schema.js";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "./util/authUtils.js";
import Query from "./graphql/resolvers/Query.js";
import Mutation from "./graphql/resolvers/Mutation.js";
import User from "./graphql/resolvers/User.js";
import Link from "./graphql/resolvers/Link.js";
import subscriptionResolvers from "./graphql/resolvers/Subscription.js";

const port = 4000;
const app = express();
const httpServer = createServer(app);

const resolvers = {
  Query,
  Mutation,
  Subscription: subscriptionResolvers,
  User,
  Link,
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers,
});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
const wsServerCleanup = useServer({ schema }, wsServer);

// const pubsub = new PubSub();
const prisma = new PrismaClient();
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
        // pubsub,
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
