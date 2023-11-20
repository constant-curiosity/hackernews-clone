import { APP_SECRET } from "../../util/authUtils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  signupValidation,
  loginValidation,
} from "../../validations/validationSchema.js";
import { z } from "zod";

//SIGNUP
export const signup = async (_, args, contextValue, ____) => {
  try {
    signupValidation.parse(args);
    const password = await bcrypt.hash(args.password, 10);
    const user = await contextValue.prisma.user.create({
      data: { ...args, password },
    });
    const token = jwt.sign({ userId: user.id }, APP_SECRET);
    return {
      authPayload: {
        token,
        user,
      },
      errors: [],
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.issues.map((issue) => ({
        message: issue.message,
      }));
      return {
        authPayload: null,
        errors: errors,
      };
    } else {
      throw new Error(error.message);
    }
  }
};

//LOGIN
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
    authPayload: {
      token,
      user,
    },
    errors: [],
  };
};

//POST
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

//DELETE
//The is a foreign key constraint on the votes table that prevents deleting a link that has votes.
// export const deleteLink = async (_, args, contextValue) => {
//   const { id } = args;
//   const { userId } = contextValue;

//   await contextValue.prisma.vote.deleteMany({
//     where: { linkId: parseInt(id) },
//   });

//   const deletedLink = await contextValue.prisma.link.delete({
//     where: { id: parseInt(id) },
//   });
//   return deletedLink;
// };

//VOTE
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
  // deleteLink,
};

//Additions
//1. Sanitizing  inputs
//2. Read on securing Gql queries
