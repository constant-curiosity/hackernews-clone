export const feed = async (_, __, context) => {
  return context.prisma.link.findMany();
};

export default {
  feed,
};
