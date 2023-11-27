export const typeDefs = `#graphql
  type Query {
    feed(filter: String, skip: Int, take: Int, orderBy: LinkOrderByInput): Feed
    # Need to build link query
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
    links: [Link]
    count: Int
    message: String
    errors: [FieldError]
  }
  type Mutation {
    deleteLink(id: ID!): Link
    login(email: String!, password: String!): LoginResponse
    logout: Boolean
    post(url: String!, description: String!): Link!
    signup(email: String!, password: String!, name: String!): SignupResponse
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
type FieldError {
  field: String
  message: String
}
type SignupResponse {
  errors: [FieldError]
  authPayload: AuthPayload
}
type LoginResponse {
  errors: [FieldError]
  authPayload: AuthPayload
  isLoggedIn: Boolean
}
`;

//Break this into smaller files by type.
