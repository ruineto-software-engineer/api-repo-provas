import { Request, Response } from 'express';
import * as userService from '../services/userService.js';

export async function register(req: Request, res: Response) {
	const registerData = req.body;

	userService.create(registerData);

	res.sendStatus(201);
}
