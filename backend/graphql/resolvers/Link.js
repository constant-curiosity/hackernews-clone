export const postedBy = async (parent, __, contextValue) => {
  return contextValue.prisma.link
    .findUnique({ where: { id: parent.id } })
    .postedBy();
};

export default {
  postedBy,
};
