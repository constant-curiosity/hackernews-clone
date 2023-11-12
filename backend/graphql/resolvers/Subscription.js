import { pubsub } from "../../index.js";

const subscriptionResolvers = {
  newLink: {
    subscribe: () => pubsub.asyncIterator("NEW_LINK"),
  },
  newVote: {
    subscribe: () => pubsub.asyncIterator("NEW_VOTE"),
  },
};

export default subscriptionResolvers;

// import { pubsub } from "./pubsub.js";

// export const subscriptionLink = {
//   newLink: {
//     subscribe: () => {
//       return pubsub.asyncIterator("NEW_LINK");
//     },
//   },
// };

// export const subscriptionNewVote = {
//   newVote: {
//     subscribe: () => {
//       return pubsub.asyncIterator("NEW_VOTE");
//     },
//   },
// };

// export default { subscriptionLink, subscriptionNewVote };

// _, __, contextValue
