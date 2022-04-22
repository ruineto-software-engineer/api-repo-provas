import * as userRepository from '../repositories/userRepository.js';
import { User } from '@prisma/client';
import bcrypt from 'bcrypt';

type CreateUserData = Omit<User, 'id'>;

export function create(registerData: CreateUserData) {
  const passwordHash = bcrypt.hashSync(registerData.password, 10);
  const userData = { ...registerData, password: passwordHash };

	userRepository.create(userData);
}
