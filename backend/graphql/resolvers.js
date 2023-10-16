import { links } from "../db.js";

export const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (_, args) => links.find((link) => link.id === args.id),
  },
  Mutation: {
    post: (_, args) => {
      const link = {
        id: `link-${links.length + 1}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (_, args) => {
      const link = links.find((link) => link.id === args.id);
      if (link) {
        link.url = args.url || link.url;
        link.description = args.description || link.description;
      }
      return link;
    },
    deleteLink: (_, args) => {
      const link = links.filter((link) => link.id !== args.id);
      return link;
    },
  },
};
