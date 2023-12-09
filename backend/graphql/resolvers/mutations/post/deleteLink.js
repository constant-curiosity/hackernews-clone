const deleteLink = async (_, args, contextValue) => {
  const { id } = args;
  const { userId } = contextValue; // Not sure if this will be needed

  await contextValue.prisma.vote.deleteMany({
    where: { linkId: parseInt(id) },
  });

  const deletedLink = await contextValue.prisma.link.delete({
    where: { id: parseInt(id) },
  });
  return deletedLink;
};

export default deleteLink;

//1. The is a foreign key constraint on the votes table that prevents deleting a link that has votes.
