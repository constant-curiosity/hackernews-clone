export const links = async (parent, __, contextValue) => {
  return contextValue.prisma.user
    .findUnique({ where: { id: parent.id } })
    .links();
};

export default {
  links,
};

// This is part of : User type

// type User {
//   id: ID!
//   name: String!
//   email: String!
//   links: [Link!]!
// }
