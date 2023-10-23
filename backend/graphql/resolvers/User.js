export const links = async (parent, __, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
};

export default {
  links,
};
