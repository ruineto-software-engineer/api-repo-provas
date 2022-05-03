import joi from 'joi';
import { User } from '@prisma/client';

type CreateUserData = Omit<User, "id">;

const userSchema = joi.object<CreateUserData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
  githubId: joi.allow(null)
});

export default userSchema;