import { PrismaClient } from "@prisma/client";
import * as argon from 'argon2';
const prisma = new PrismaClient();

export const getAccounts = async () => {
  return await prisma.account.findMany();
};

export const getAccount = async (id) => {
  return await prisma.account.findUnique({
    where: {
      id: id
    }
  });
};

export const createAccount = async (account) => {
  return await prisma.account.create({
    data: {
      ...account,
      password: await argon.hash(account.password)
    }
  });
};

export const updateAccount = async (account) => {
  return await prisma.account.update({
    where: {
      id: account.id
    },
    data: {
      ...account,
      password: await argon.hash(account.password)
    }
  });
};

export const deleteAccount = async (id) => {
  return await prisma.account.delete({
    where: {
      id: id
    }
  });
};

export const login = async (email, password) => {
  const account = await prisma.account.findUnique({
    where: {
      email: email
    }
  });

  if (!account) {
    throw new Error('Invalid email or password');
  }

  if (!await argon.verify(account.password, password)) {
    throw new Error('Invalid email or password');
  }

  return account;
}
