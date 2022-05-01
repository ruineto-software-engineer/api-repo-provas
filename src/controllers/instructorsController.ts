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

export async function getAllDisciplines(req: Request, res: Response) {
	const disciplines = await instructorsService.getAllDisciplines();

	res.send(disciplines);
}

export async function getInstructorsByDiscipline(req: Request, res: Response) {
	const disciplineId: number = parseInt(req.params.disciplineId);

	const teachersByDiscipline = await instructorsService.getInstructorsByDiscipline(disciplineId);

	res.send(teachersByDiscipline);
}

export async function createTestByInstructor(req: Request, res: Response) {
	const testData = req.body;
	const newTeacherDisciplineData: instructorsService.CreateNewTeacherDisciplineData = {
		disciplineId: testData.disciplineId,
		teacherId: testData.teacherId
	};
	const newTestData: instructorsService.CreateNewTestData = {
		name: testData.name,
		pdfUrl: testData.pdfUrl,
		categoryId: testData.categoryId,
		views: testData.views
	};

	await instructorsService.createTestByInstructor(newTeacherDisciplineData, newTestData);

	res.sendStatus(201);
}
