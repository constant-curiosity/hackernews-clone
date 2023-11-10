export const feed = async (_, __, contextValue) => {
  const links = await contextValue.prisma.link.findMany();
  return links;
};

export default {
  feed,
};
