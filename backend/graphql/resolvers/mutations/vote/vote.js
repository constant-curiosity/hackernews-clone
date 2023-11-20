export const vote = async (_, args, contextValue, ____) => {
  const { userId } = contextValue;
  const vote = await contextValue.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      },
    },
  });
  if (!!vote) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }
  const newVote = await contextValue.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });

  await contextValue.pubsub.publish("NEW_VOTE", { newVote });
  return newVote;
};

export default vote;
