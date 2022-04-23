import { User } from '@prisma/client';
import { prisma } from '../database.js';
import * as errorsUtils from '../utils/errorsUtils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type CreateLoginData = Omit<User, 'id'>;

export async function create(loginData: CreateLoginData) {
	const secretKey = process.env.JWT_SECRET;
	const configuration = { expiresIn: 60 * 60 };

	const user = await prisma.user.findUnique({ where: { email: loginData.email } });
	if (!user) throw errorsUtils.notFoundError('User');

	const isAuthorized = bcrypt.compareSync(loginData.password, user.password);
	if (isAuthorized) {
		const token = jwt.sign(loginData, secretKey, configuration);

		await prisma.sessions.create({ data: { token, userId: user.id } });

		return { token, userId: user.id, email: user.email };
	}

	throw errorsUtils.unauthorizedError('Credentials');
}

export async function remove(userId: number) {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) throw errorsUtils.notFoundError('User');

	const session = await prisma.sessions.findFirst({ where: { userId: user.id } });
	if(!session) throw errorsUtils.badRequestError('Session');

	await prisma.sessions.delete({ where: { token: session.token } });
}
