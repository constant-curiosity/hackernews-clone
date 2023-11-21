import allResolvers from "./allResolvers.js";

const resolvers = {
  Link: {
    ...allResolvers.TypeResolvers.postedByVotesonLink,
  },
  Mutation: {
    ...allResolvers.AuthMutations,
    ...allResolvers.PostMutations,
    ...allResolvers.VoteMutations,
  },
  User: {
    ...allResolvers.TypeResolvers.userLinks,
  },
  Vote: {
    ...allResolvers.TypeResolvers.linkUserVote,
  },
  Query: allResolvers.Query,
  Subscription: allResolvers.Subscription,
};

export default resolvers;
