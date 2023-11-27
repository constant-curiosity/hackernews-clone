import { postValidation } from "../../../../validations/validationSchema.js";
import validateWithZod from "../../../../validations/validateWithZod.js";

export const post = async (_, args, contextValue, ____) => {
  try {
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
  } catch (error) {
    console.error(error.message); // Log the error message
    throw new Error(error.message); // Then throw the error
  }
};

export default post;

//This is supposed to return a link do not buddle a error array with this
//create a Union type to handle this
