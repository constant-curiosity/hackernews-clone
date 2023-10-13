import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const num = 1;

const typeDefs = `
  type Query {
    info: String!
  }
`;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);

//Sever
