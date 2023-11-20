export const links = async (parent, __, contextValue) => {
  return contextValue.prisma.user
    .findUnique({ where: { id: parent.id } })
    .links();
};

export default {
  links,
};
