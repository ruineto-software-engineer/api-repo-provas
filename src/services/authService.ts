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

		return { token, email: user.password };
	}

	throw errorsUtils.unauthorizedError('Credentials');
}
