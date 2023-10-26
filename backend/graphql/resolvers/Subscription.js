// export const newLink = {
//   subscribe: (_, __, context) => {
//     return context.pubsub.asyncIterator("NEW_LINK");
//   },
//   resolve: (payload) => {
//     return payload.newLink;
//   },
// };

// export default {
//   newLink,
// };

function newLinkSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_LINK");
}

const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

export default {
  newLink,
};
