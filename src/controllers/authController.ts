import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export async function login(req: Request, res: Response) {
	const loginData = req.body;

  const session = await authService.create(loginData);

  res.status(200).send(session);
}

export async function loginGitHub(req: Request, res: Response) {
  const loginGitHubData: authService.CreateLoginGitHubData = req.body;

  const session = await authService.createGitHub(loginGitHubData);

  res.status(200).send(session);
}

export async function logout(req: Request, res: Response) {
  const userId = parseInt(req.params.userId);

  await authService.remove(userId);

  res.sendStatus(200);
}
