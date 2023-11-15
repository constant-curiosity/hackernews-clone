// export const feed = async (_, __, contextValue) => {
//   const links = await contextValue.prisma.link.findMany();
//   return links;
// };

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
  });
  return links;
};

export default {
  feed,
};
