import { prisma } from "../../index.js";

export const postedBy = async (parent, __, ___) => {
  return prisma.link.findUnique({ where: { id: parent.id } }).postedBy();
};

export const votes = async (parent, __, ___) => {
  return prisma.link.findUnique({ where: { id: parent.id } }).votes();
};

export default {
  postedBy,
  votes,
};
