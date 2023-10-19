export const links = async (_, args, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
};

export default {
  links,
};
