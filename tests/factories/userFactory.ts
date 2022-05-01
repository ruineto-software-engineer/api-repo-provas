import bcrypt from "bcrypt";
import { prisma } from "../../src/database.js";
import { CreateUserData } from "../../src/services/userService.js";

export default async function userFactory(user: CreateUserData) {
  await prisma.user.create({
    data: {
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    },
  });
}