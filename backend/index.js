import { ApolloServer } from "apollo-server";
import { typeDefs } from "./graphql/schema.js";
// import { resolvers } from "./graphql/resolvers.js";
import { PrismaClient } from "@prisma/client";
import { getUserId } from "../../util/utils";
import { Query } from "./graphql/resolvers/Query.js";
import { Mutation } from "./graphql/resolvers/Mutation.js";
import { User } from "./graphql/resolvers/User.js";
import { Link } from "./graphql/resolvers/Link.js";

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma: new PrismaClient(),
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
