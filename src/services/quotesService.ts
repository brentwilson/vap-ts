import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getQuotes = async (account) => {
  return await prisma.quote.findMany({
    where: {
      account: account
    },
    include: {
     items: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const createQuote = async (quote) => {
  return await prisma.quote.create({
    data: {
      ...quote,
      items: {
        create: quote.items
      }
    }
  });
};

export const updateQuote = async (quote) => {
  return await prisma.quote.update({
    where: {
      id: quote.id
    },
    data: {
      ...quote,
      items: {
        create: quote.items
      }
    }
  });
};

export const deleteQuote = async (id) => {
  return await prisma.quote.delete({
    where: {
      id: id
    }
  });
};

export const getQuote = async (id) => {
  return await prisma.quote.findUnique({
    where: {
      id: id
    },
    include: {
      items: true
    }
  });
}