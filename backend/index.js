import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema.js";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "./util/authUtils.js";
import Query from "./graphql/resolvers/Query.js";
import Mutation from "./graphql/resolvers/Mutation.js";
import User from "./graphql/resolvers/User.js";
import Link from "./graphql/resolvers/Link.js";

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const prisma = new PrismaClient();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  introspection: true,
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
