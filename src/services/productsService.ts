import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getProducts = async () => {
  return await prisma.product.findMany();
};

export const getProduct = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
};

export const createProduct = async (product) => {
  return await prisma.product.create({
    data: product,
  });
};

export const upsertProduct = async (product) => {
  return await prisma.product.upsert({
    where: {
      id: product.id,
    },
    update: product,
    create: product,
  });
};

export const updateProduct = async (product) => {
  return await prisma.product.update({
    where: {
      id: product.id,
    },
    data: product,
  });
};

export const deleteProduct = async (id) => {
  return await prisma.product.delete({
    where: {
      id: id,
    },
  });
};

export const getProductsByCategory = async (category) => {
  return await prisma.product.findMany({
    where: {
      categories: {
        some: {
          category: {
            name: category,
          },
        },
      },
    },
  });
};
