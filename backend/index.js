import "dotenv/config";
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
import allResolvers from "./graphql/resolvers/allResolvers.js";
import cors from "cors";
import express from "express";
const port = 4000;
const app = express();
const httpServer = createServer(app);
const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
  Link: allResolvers.Link,
  Mutation: {
    ...allResolvers.AuthMutations,
    ...allResolvers.PostMutations,
    ...allResolvers.VoteMutations,
  },
  User: {
    ...allResolvers.TypeResolvers.userLinks,
  },
  Vote: {
    ...allResolvers.TypeResolvers.linkUserVote,
  },
  Query: allResolvers.Query,
  Subscription: allResolvers.Subscription,
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
  console.log(`Query endpoint ready at http://localhost:${port}/graphql`);
  console.log(`Subscription endpoint ready at ws://localhost:${port}/graphql`);
});
