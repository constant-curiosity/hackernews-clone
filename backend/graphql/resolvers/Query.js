export const feed = async (_, __, context) => {
  console.log(context.pubsub);
  console.log(context.userId);
  console.log(context.prisma);
  const links = await context.prisma.link.findMany();
  return links;
};

export default {
  feed,
};
