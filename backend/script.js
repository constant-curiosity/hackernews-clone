import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const newLink = await prisma.link.create({
  //   data: {
  //     description: "Create from script.js",
  //     url: "www.script-js.com",
  //   },
  // });
  // const newLink = await prisma.link.delete({
  //   where: {
  //     id: 7,
  //   },
  // });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
