import { User } from '@prisma/client';
import { prisma } from '../database.js';
import * as errorsUtils from '../utils/errorsUtils.js';
import * as authUtils from '../utils/authUtils.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

type CreateLoginData = Omit<User, 'id'>;

export interface CreateLoginGitHubData {
	code: string;
}

export async function create(loginData: CreateLoginData) {
	const secretKey = process.env.JWT_SECRET;
	const configuration = { expiresIn: 60 * 60 };

	const user = await prisma.user.findUnique({ where: { email: loginData.email } });
	if (!user) throw errorsUtils.unauthorizedError('Credentials');

	const isAuthorized = bcrypt.compareSync(loginData.password, user.password);
	if (isAuthorized) {
		const token = jwt.sign(loginData, secretKey, configuration);

		await prisma.sessions.create({ data: { token, userId: user.id } });

		return { token, userId: user.id, email: user.email };
	}

	throw errorsUtils.unauthorizedError('Credentials');
}

export async function createGitHub(data: CreateLoginGitHubData) {
	const secretKey = process.env.JWT_SECRET;
	const configuration = { expiresIn: 60 * 60 };

	const dataToken = await authUtils.loginGitHub(data.code);

	const userDataGitHub = await authUtils.getUserDataGitHub(
		dataToken.access_token, 
		dataToken.token_type
	);

	const userGitHub = await prisma.user.findUnique({
		where: {
			githubId: userDataGitHub.id
		}
	});

	if (!userGitHub) {
		if (!userDataGitHub.email) {
			const user = await prisma.user.create({
				data: {
					githubId: userDataGitHub.id
				}
			});

			delete user.password;
			const token = jwt.sign(user, secretKey, configuration);

			await prisma.sessions.create({ data: { token, userId: user.githubId } });

			return { token, userId: user.githubId, email: user.email };
		}

		const user = await prisma.user.upsert({
			where: {
				email: userDataGitHub.email
			},
			update: {
				email: userDataGitHub.email,
				githubId: userDataGitHub.id
			},
			create: {
				email: userDataGitHub.email,
				githubId: userDataGitHub.id
			}
		});

		delete user.password;
		const token = jwt.sign(user, secretKey, configuration);

		await prisma.sessions.create({ data: { token, userId: user.id } });

		return { token, userId: user.id, email: user.email };
	}

	delete userGitHub.password;
	const token = jwt.sign(userGitHub, secretKey, configuration);

	await prisma.sessions.create({ data: { token, userId: userGitHub.id } });

	return { token, userId: userGitHub.id, email: userGitHub.email };
}

export async function remove(userId: number) {
	const user = await prisma.user.findUnique({ where: { id: userId } });
	if (!user) throw errorsUtils.notFoundError('User');

	const session = await prisma.sessions.findFirst({ where: { userId: user.id } });
	if (!session) throw errorsUtils.badRequestError('Session');

	await prisma.sessions.delete({ where: { token: session.token } });
}
