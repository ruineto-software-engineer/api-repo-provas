import { prisma } from '../../src/database.js';

export async function createUserFactory () {
  const user = {
    email: 'leosilva@gmail.com',
    password: '1234'
  };

  const insertedUser = await prisma.user.create({
    data: {
      email: user.email,
      password: user.password
    }
  });

  return insertedUser;
} 