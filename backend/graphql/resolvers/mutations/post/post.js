import { postValidation } from "../../../../validations/validationSchema.js";
import validateWithZod from "../../../../validations/validateWithZod.js";

export const post = async (_, args, contextValue, ____) => {
  validateWithZod(postValidation, args);
  const { userId } = contextValue;
  if (!userId) {
    return {
      errors: [{ message: "Invalid email ." }],
    };
  }
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

export default post;

//1. Build validate schema from zod
//2. Account for Errors with zod
//3. Make sure the user is validated before posting
// if check then return error to user
