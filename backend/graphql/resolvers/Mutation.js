import { APP_SECRET } from "../../util/authUtils.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//SIGNUP
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
    token,
    user,
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
export const deleteLink = async (_, args, contextValue) => {
  const { id } = args;
  const { userId } = contextValue;

  if (!userId) {
    console.log("User Not Logged In");
    return null;
  }

  try {
    const parsedId = parseInt(id);
    console.log(`Parsed id: ${parsedId}`); // Log the parsed id

    const link = await contextValue.prisma.link.findUnique({
      where: { id: parsedId },
    });

    console.log(`Link: ${JSON.stringify(link)}`); // Log the link

    if (!link) {
      console.log(`No link found with id: ${parsedId}`);
      return null;
    }

    await contextValue.prisma.vote.deleteMany({
      where: { linkId: parsedId },
    });

    let deletedLink;
    try {
      deletedLink = await contextValue.prisma.link.delete({
        where: { id: parsedId },
      });
    } catch (error) {
      console.error("Error deleting link:", error);
      throw error;
    }

    console.log(`Deleted link: ${JSON.stringify(deletedLink)}`); // Log the deleted link
    return deletedLink;
  } catch (error) {
    console.error("Error in deleteLink function:", error);
    throw error;
  }
};

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
