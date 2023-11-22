export const feed = async (_, args, contextValue) => {
  const where = args.filter
    ? {
        OR: [
          { description: { contains: args.filter } },
          { url: { contains: args.filter } },
        ],
      }
    : {};
  const links = await contextValue.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });
  const count = await contextValue.prisma.link.count({ where });
  return { links, count };
};

export default {
  feed,
};
