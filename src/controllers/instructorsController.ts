import { Request, Response } from 'express';
import * as instructorsService from '../services/instructorsService.js';

export async function getInstructors(req: Request, res: Response) {
  const instructors = await instructorsService.getInstructors();

  res.send(instructors);
}

export async function getInstructorsCategories(req: Request, res: Response) {
  const categories = await instructorsService.getInstructorsCategories();

  res.send(categories);
}

export async function getInstructorsByName(req: Request, res: Response) {
  const instructorName: string = req.params.instructorName;

  const teachersByName = await instructorsService.getInstructorsByName(instructorName);

  res.send(teachersByName);
}

export async function updateTestViewsById(req: Request, res: Response) {
  const testId: number = parseInt(req.params.testId);

  await instructorsService.updateTestViewsById(testId);

  res.sendStatus(200);
}