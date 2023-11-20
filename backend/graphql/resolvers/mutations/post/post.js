export const post = async (_, args, contextValue, ____) => {
  const { userId } = contextValue;
  const newLink = await contextValue.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
  await contextValue.pubsub.publish("NEW_LINK", { newLink });
  return newLink;
};

export default post;

//1. Build validate schema for zod
//2. Account for Errors with zod
//3. Make sure the user is validated before posting
