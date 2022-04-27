import { Request, Response } from 'express';
import * as coursesService from '../services/coursesService.js';

export async function getDisciplines(req: Request, res: Response) {
  const disciplines = await coursesService.getDisciplines();

  res.send(disciplines);
}

export async function getDisciplinesByName(req: Request, res: Response) {
  const disciplineName: string = req.params.disciplineName;

  const termsByDisciplines = await coursesService.getDisciplinesByName(disciplineName);

  res.send(termsByDisciplines);
}