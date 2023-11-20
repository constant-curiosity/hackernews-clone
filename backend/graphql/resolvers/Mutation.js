// import { APP_SECRET } from "../../util/authUtils.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import {
//   signupValidation,
//   loginValidation,
// } from "../../validations/validationSchema.js";
// // import { z } from "zod";
// import validateWithZod from "../../validations/validateWithZod.js";

//SIGNUP
// export const signup = async (_, args, contextValue, ____) => {
//   try {
//     validateWithZod(signupValidation, args);
//     const existingUser = await contextValue.prisma.user.findUnique({
//       where: { email: args.email },
//     });

//     if (existingUser) {
//       return {
//         authPayload: null,
//         errors: [{ message: "Email already in use." }],
//       };
//     }
//     const password = await bcrypt.hash(args.password, 10);
//     const user = await contextValue.prisma.user.create({
//       data: { ...args, password },
//     });
//     const token = jwt.sign({ userId: user.id }, APP_SECRET);
//     return {
//       authPayload: {
//         token,
//         user,
//       },
//       errors: [],
//     };
//   } catch (error) {
//     if (error.message.includes("validationErrors")) {
//       return {
//         authPayload: null,
//         errors: JSON.parse(error.message).validationErrors,
//       };
//     } else {
//       throw new Error(error.message);
//     }
//   }
// };

//LOGIN
// export const login = async (_, args, contextValue, ____) => {
//   try {
//     validateWithZod(loginValidation, args);
//     const user = await contextValue.prisma.user.findUnique({
//       where: { email: args.email },
//     });
//     if (!user) {
//       return {
//         errors: [{ message: "Invalid email ." }],
//       };
//     }
//     const valid = await bcrypt.compare(args.password, user.password);
//     if (!valid) {
//       return {
//         errors: [{ message: "Invalid password." }],
//       };
//     }
//     const token = jwt.sign({ userId: user.id }, APP_SECRET);
//     return {
//       authPayload: {
//         token,
//         user,
//       },
//       errors: [],
//     };
//   } catch (error) {
//     if (error.message.includes("validationErrors")) {
//       return {
//         authPayload: null,
//         errors: JSON.parse(error.message).validationErrors,
//       };
//     } else {
//       throw new Error(error.message);
//     }
//   }
// };

//POST
// export const post = async (_, args, contextValue, ____) => {
//   const { userId } = contextValue;
//   const newLink = await contextValue.prisma.link.create({
//     data: {
//       url: args.url,
//       description: args.description,
//       postedBy: { connect: { id: userId } },
//     },
//   });
//   await contextValue.pubsub.publish("NEW_LINK", { newLink });
//   return newLink;
// };

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
// export const vote = async (_, args, contextValue, ____) => {
//   const { userId } = contextValue;
//   const vote = await contextValue.prisma.vote.findUnique({
//     where: {
//       linkId_userId: {
//         linkId: Number(args.linkId),
//         userId: userId,
//       },
//     },
//   });
//   if (!!vote) {
//     throw new Error(`Already voted for link: ${args.linkId}`);
//   }
//   const newVote = await contextValue.prisma.vote.create({
//     data: {
//       user: { connect: { id: userId } },
//       link: { connect: { id: Number(args.linkId) } },
//     },
//   });

//   await contextValue.pubsub.publish("NEW_VOTE", { newVote });
//   return newVote;
// };

// export default {
//   signup,
//   login,
//   post,
//   vote,
//   // deleteLink,
// };

//Additions
//1. Sanitizing  inputs
//2. Read on securing Gql queries
