export const postedBy = async (parent, __, context) => {
  return context.prisma.link
    .findUnique({ where: { id: parent.id } })
    .postedBy();
};

export default {
  postedBy,
};
