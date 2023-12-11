export const link = async (parent, __, contextValue) => {
  return contextValue.prisma.vote
    .findUnique({ where: { id: parent.id } })
    .link();
};

export const user = async (parent, __, contextValue) => {
  return contextValue.prisma.vote
    .findUnique({ where: { id: parent.id } })
    .user();
};

export default {
  link,
  user,
};

// This is part of : type Vote.
