export const links = async (_, __, context) => {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links();
};

export default {
  links,
};
