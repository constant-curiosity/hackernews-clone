export const feed = async (_, args, context) => {
  return context.prisma.link.findMany();
};

export default {
  feed,
};
