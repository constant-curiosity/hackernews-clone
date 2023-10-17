import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    prisma: new PrismaClient(),
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
