import { Request, Response } from 'express';
import * as coursesService from '../services/coursesService.js';

export async function getDisciplines(req: Request, res: Response) {
  const disciplines = await coursesService.getDisciplines();

  res.send(disciplines);
}
