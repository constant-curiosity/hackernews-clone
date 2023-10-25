export const newLink = {
  subscribe: (_, __, context) => {
    return context.pubsub.asyncIterator("NEW_LINK");
  },
  resolve: (payload) => {
    return payload.newLink;
  },
};

export default {
  newLink,
};
