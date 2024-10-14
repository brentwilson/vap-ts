import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getQuotes = async (account: any) => {
  let quotes = await prisma.quote.findMany({
    where: {
      account: account,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // get total of all quote items in each quote
  quotes = quotes.map((quote) => {
    let total = 0;
    quote.items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return { ...quote, total };
  });

  return quotes;
};

export const createQuote = async (quote) => {
  return await prisma.quote.create({
    data: {
      ...quote,
      items: {
        create: quote.items,
      },
    },
  });
};

export const updateQuote = async (quote) => {
  return await prisma.quote.update({
    where: {
      id: quote.id,
    },
    data: {
      ...quote,
      items: {
        create: quote.items,
      },
    },
  });
};

export const upsertQuote = async (quote) => {
  return await prisma.quote.upsert({
    where: {
      id: quote.id,
    },
    update: {
      ...quote,
      items: {
        create: quote.items,
      },
    },
    create: {
      ...quote,
      items: {
        create: quote.items,
      },
    },
  });
};

export const deleteQuote = async (id: string) => {
  return await prisma.quote.delete({
    where: {
      id: id,
    },
  });
};

export const getQuote = async (id: string) => {
  return await prisma.quote.findUnique({
    where: {
      id: id,
    },
    include: {
      items: true,
    },
  });
};
