import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const processCart = async (cart, account) => {
  try {
    await prisma.quote.create({
      data: {
        account: account,
        items: {
          create: cart,
        },
      },
    });
  } catch (err) {
    console.error(err);
  }
};
