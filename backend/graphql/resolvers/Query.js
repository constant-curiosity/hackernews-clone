// export const feed = async (_, __, context) => {
//   return context.prisma.link.findMany();
// };

// export default {
//   feed,
// };

function feed(_, __, context) {
  return context.prisma.link.findMany();
}

export default {
  feed,
};
