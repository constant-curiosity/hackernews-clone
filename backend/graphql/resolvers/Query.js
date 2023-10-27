export const feed = async (_, __, context) => {
  const links = await context.prisma.link.findMany();
  return links;
};

export default {
  feed,
};
