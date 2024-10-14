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

export const getQuoteItems = async (quoteId: string) => {
  return await prisma.quoteItem.findMany({
    where: {
      quoteId: quoteId,
    },
  });
};

export const getQuoteItem = async (itemId: string) => {
  return await prisma.quoteItem.findUnique({
    where: {
      id: itemId,
    },
  });
};

export const upsertQuoteItem = async (quoteItem) => {
  return await prisma.quoteItem.upsert({
    where: {
      id: quoteItem.id,
    },
    update: quoteItem,
    create: quoteItem,
  });
};

export const deleteQuoteItem = async (id: string) => {
  return await prisma.quoteItem.delete({
    where: {
      id: id,
    },
  });
};

export const deleteQuoteItems = async (quoteId: string) => {
  return await prisma.quoteItem.deleteMany({
    where: {
      quoteId: quoteId,
    },
  });
};

export const upsertQuoteItems = async (quoteId: string, quoteItems) => {
  const upsertedItems = await Promise.all(
    quoteItems.map(async (item) => {
      return await prisma.quoteItem.upsert({
        where: {
          id: item.id,
        },
        update: item,
        create: { ...item, quoteId: quoteId },
      });
    })
  );
  return upsertedItems;
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
        updateMany: quote.items,
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
        updateMany: quote.items,
      },
    },
    create: {
      ...quote,
      items: {
        createMany: quote.items,
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
