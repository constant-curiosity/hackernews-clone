import { APP_SECRET } from "../../util/authUtils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (_, args, contextValue, ____) => {
  const password = await bcrypt.hash(args.password, 10);
  const user = await contextValue.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
};

export const login = async (_, args, contextValue, ____) => {
  const user = await contextValue.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
};

export const post = async (_, args, contextValue, ____) => {
  const { userId } = contextValue;
  const newLink = await contextValue.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });
  await contextValue.pubsub.publish("NEW_LINK", { newLink });
  return newLink;
};

export const vote = async (_, args, contextValue, ____) => {
  const { userId } = contextValue;
  const vote = await contextValue.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      },
    },
  });
  if (!!vote) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }
  const newVote = await contextValue.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });

  await contextValue.pubsub.publish("NEW_VOTE", { newVote });
  return newVote;
};

export default {
  signup,
  login,
  post,
  vote,
};
