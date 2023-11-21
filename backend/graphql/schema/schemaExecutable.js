import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "../schema.js";
import resolvers from "../resolvers/graphqlResolverObj.js";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers,
});

export default schema;
