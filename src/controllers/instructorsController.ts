import { Request, Response } from 'express';
import * as instructorsService from '../services/instructorsService.js';

export async function getInstructors(req: Request, res: Response) {
  const instructors = await instructorsService.getInstructors();

  res.send(instructors);
}
