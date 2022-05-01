import { prisma } from '../database.js';
import { User } from '@prisma/client';
import * as errorsUtils from '../utils/errorsUtils.js';
import * as userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';

export type CreateUserData = Omit<User, 'id'>;

export async function create(registerData: CreateUserData) {
	const searchedUser = await prisma.user.findFirst({ where: { email: registerData.email } });
  if(searchedUser) throw errorsUtils.conflictError('User');

	const passwordHash = bcrypt.hashSync(registerData.password, 10);
	const userData = { ...registerData, password: passwordHash };

	userRepository.create(userData);
}
