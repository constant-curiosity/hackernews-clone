export const typeDefs = `#graphql
  type Query {
    info: String!
    feed(filter: String, skip: Int, take: Int, orderBy: LinkOrderByInput): Feed!
    link(id: ID!): Link
  }
  input LinkOrderByInput {
    description: Sort
    url: Sort
    createdAt: Sort
  }
  enum Sort {
    asc
    desc
  }
  type Feed {
    links: [Link!]!
    count: Int!
  }
  type Mutation {
    post(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
    deleteLink(id: ID!): Link
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    vote(linkId: ID!): Vote
  }
  type Link {
    id: ID!
    description: String!
    url: String!
    postedBy: User
    votes: [Vote!]!
  }
  type AuthPayload {
  token: String
  user: User
}
type User {
  id: ID!
  name: String!
  email: String!
  links: [Link!]!
}
type Subscription {
  newLink: Link
  newVote: Vote
}
type Vote {
  id: ID!
  link: Link!
  user: User!
}
`;
