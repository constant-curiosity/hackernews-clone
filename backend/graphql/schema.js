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
    deleteLink(id: ID!): Link
    login(email: String!, password: String!): AuthPayload
    post(url: String!, description: String!): Link!
    signup(email: String!, password: String!, name: String!): AuthPayload
    updateLink(id: ID!, url: String, description: String): Link
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
