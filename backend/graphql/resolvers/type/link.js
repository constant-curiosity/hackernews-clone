export const postedBy = async (parent, __, contextValue) => {
  return contextValue.prisma.link
    .findUnique({ where: { id: parent.id } })
    .postedBy();
};

export const votes = async (parent, __, contextValue) => {
  return contextValue.prisma.link
    .findUnique({ where: { id: parent.id } })
    .votes();
};

export default {
  postedBy,
  votes,
};

// This is part of : type Link

// type Link {
//   id: ID!
//   description: String!
//   url: String!
//   postedBy: User
//   votes: [Vote!]!
// }
