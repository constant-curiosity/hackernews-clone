export const feed = async (_, args, contextValue) => {
  try {
    const where = args.filter
      ? {
          OR: [
            { description: { contains: args.filter } },
            { url: { contains: args.filter } },
          ],
        }
      : {};
    const links = await contextValue.prisma.link.findMany({
      where,
      skip: args.skip,
      take: args.take,
      orderBy: args.orderBy,
      orderBy: args.orderBy || { createdAt: "desc" },
    });

    links.forEach((link) => {
      link.createdAt = link.createdAt.toISOString();
      // link.createdAt = new Date(Number(link.createdAt)).toISOString();
    });

    const count = await contextValue.prisma.link.count({ where });

    let message = "";
    links.length === 0 ? (message = "No links found. Add a link :-)") : "";

    return { links, count, message, errors: [] };
  } catch (error) {
    //Debugging code:
    console.log("Error in feed query:", error);
    if (error) {
      return {
        links: null,
        count: null,
        message: "",
        errors: [{ message: "Problem getting links." }],
      };
    }
  }
};

export default {
  feed,
};
