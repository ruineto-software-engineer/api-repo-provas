import { NextFunction, Request, Response } from "express";
import { prisma } from "../database.js";
import * as errorsUtils from "../utils/errorsUtils.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default async function validateTokenMiddleware(req:Request, res:Response, next:NextFunction) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace('Bearer ', '');
  const secretKey = process.env.JWT_SECRET;
  if(!token) throw errorsUtils.unauthorizedError('');

  try {
    const session = await prisma.sessions.findUnique({ where: { token: token } });
    if(!session) throw errorsUtils.unauthorizedError('');

    try {
      const user = await prisma.user.findUnique({ where: { id: session.userId } });
      if(!user) throw errorsUtils.notFoundError('User');

      jwt.verify(session.token, secretKey);

      res.locals.user = {email: user.email, userId: session.userId};
      
      next();
    } catch (error) {
      console.log(error);
      res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}