import { prisma } from '../database.js';
import { User } from '@prisma/client';

type CreateUserData = Omit<User, 'id'>;

export async function create(userData: CreateUserData) {
  await prisma.user.create({ data: userData });
}
