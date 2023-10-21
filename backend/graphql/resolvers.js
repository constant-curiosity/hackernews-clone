// export const resolvers = {
//   Query: {
//     info: () => `This is the API of a Hackernews Clone`,
//     // feed: async (_, args, context) => {
//     //   return context.prisma.link.findMany();
//     // },
//     link: async (_, args, context) => {
//       const { id } = args;
//       const link = await context.prisma.link.findUnique({
//         where: { id: parseInt(id) },
//       });
//       return link;
//     },
//   },
//   Mutation: {
//     // post: (_, args, context, info) => {
//     //   const newLink = context.prisma.link.create({
//     //     data: {
//     //       url: args.url,
//     //       description: args.description,
//     //     },
//     //   });
//     //   return newLink;
//     // },
//     updateLink: async (_, args, context) => {
//       const { id, url, description } = args;
//       const updatedLink = await context.prisma.link.update({
//         where: { id: parseInt(id) },
//         data: { url: url || undefined, description: description || undefined },
//       });
//       return updatedLink;
//     },
//     deleteLink: async (_, args, context) => {
//       const { id } = args;
//       const deletedLink = await context.prisma.link.delete({
//         // where: { id },
//         where: { id: parseInt(id) },
//       });
//       return deletedLink;
//     },
//   },
// };

export const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
  },
};
