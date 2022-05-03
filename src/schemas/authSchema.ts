import joi from 'joi';
import { User } from '@prisma/client';

type CreateAuthData = Omit<User, "id">;

const authSchema = joi.object<CreateAuthData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
  githubId: joi.allow(null)
});

export default authSchema;