export const newLink = {
  subscribe: (_, __, context) => {
    return context.pubsub.asyncIterator("NEW_LINK");
  },
  resolve: (payload) => {
    console.log("Subscription Payload:", payload); // Added by me
    return payload.newLink;
  },
};

export default {
  newLink,
};
