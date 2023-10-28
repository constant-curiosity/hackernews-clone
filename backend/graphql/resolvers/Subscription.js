// export const newLink = {
//   subscribe: (_, __, contextValue) => {
//     console.log("Context:", contextValue); // Added by me
//     return contextValue.pubsub.asyncIterator("NEW_LINK");
//   },
//   resolve: (payload) => {
//     console.log("Subscription Payload:", payload); // Added by me
//     return payload.newLink;
//   },
// };
// export default {
//   newLink,
const subscriptionResolvers = {
  Subscription: {
    newLink: {
      subscribe: (_, __, { pubsub }) => {
        console.log("Context:", { pubsub }); // Added for debugging
        return pubsub.asyncIterator("NEW_LINK");
      },
      resolve: (payload) => {
        console.log("Subscription Payload:", payload); // Added for debugging
        return payload.newLink;
      },
    },
  },
};

export default subscriptionResolvers;
