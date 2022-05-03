import { prisma } from '../database.js';
import { User } from '@prisma/client';
import userRouter from '../routes/userRouter.js';

type CreateUserData = Omit<User, 'id'>;

export async function create(userData: CreateUserData) {
	await prisma.user.create({ data: userData });
}

export async function update(userData: CreateUserData) {
	await prisma.user.update({
		where: {
      email: userData.email
    },
    data: {
      password: userData.password
    },
	});
}
