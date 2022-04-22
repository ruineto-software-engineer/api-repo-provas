import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export async function login(req: Request, res: Response) {
	const loginData = req.body;

  const session = await authService.create(loginData);

  res.status(201).send(session);
}
