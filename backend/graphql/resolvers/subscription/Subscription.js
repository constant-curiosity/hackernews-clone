const subscriptionResolvers = {
  newLink: {
    subscribe: (_, __, contextValue) =>
      contextValue.pubsub.asyncIterator("NEW_LINK"),
  },
  newVote: {
    subscribe: (_, __, contextValue) =>
      contextValue.pubsub.asyncIterator("NEW_VOTE"),
  },
};

export default subscriptionResolvers;
