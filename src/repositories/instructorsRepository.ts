import { prisma } from '../database.js';
import { teachersDisciplines, Test } from '@prisma/client';

export type CreateTeacherDisciplineData = Omit<teachersDisciplines, 'id'>;
export type CreateTestData = Omit<Test, 'id'>;

export async function getInstructors() {
	const teachers = await prisma.teacher.findMany({
		select: {
			id: true,
			name: true,
			teachersDisciplines: {
				include: {
					discipline: true,
					test: {
						include: {
							category: true
						}
					}
				}
			}
		}
	});

	return teachers;
}

export async function getInstructorByName(instructorName: string) {
	const instructor = await prisma.teacher.findFirst({
		where: {
			name: instructorName
		}
	});

	return instructor;
}

export async function getInstructorsByName(instructorName: string) {
	const teachersByName = await prisma.teacher.findMany({
		select: {
			id: true,
			name: true,
			teachersDisciplines: {
				include: {
					discipline: true,
					test: {
						include: {
							category: true
						}
					}
				}
			}
		},
		where: {
			name: {
				contains: instructorName,
				mode: 'insensitive'
			}
		}
	});

	return teachersByName;
}

export async function getAllCategories() {
	const categories = await prisma.category.findMany();

	return categories;
}

export async function getTest(testId: number) {
	const test = await prisma.test.findFirst({
		where: {
			id: testId
		}
	});

	return test;
}

export async function updateTestViewsById(testId: number) {
	await prisma.test.update({
		where: {
			id: testId
		},
		data: {
			views: {
				increment: 1
			}
		}
	});
}

export async function getAllDisciplines() {
	const disciplines = await prisma.discipline.findMany();

	return disciplines;
}

export async function getInstructorsByDiscipline(disciplineId: number) {
	const instructorsByDiscipline = await prisma.teacher.findMany({
		include: {
			teachersDisciplines: {
				include: {
					discipline: true
				},
				where: {
					disciplineId: disciplineId
				}
			}
		}
	});

	return instructorsByDiscipline;
}

export async function createTeachersDisciplines(teacherDisciplineData: CreateTeacherDisciplineData) {
	await prisma.teachersDisciplines.create({
		data: {
			teacherId: teacherDisciplineData.teacherId,
			disciplineId: teacherDisciplineData.disciplineId
		}
	});
}

export async function searchTeacherDisciplineByData(teacherDisciplineData: CreateTeacherDisciplineData) {
	const teacherDisciplineByData = await prisma.teachersDisciplines.findFirst({
		where: {
			teacherId: teacherDisciplineData.teacherId,
			disciplineId: teacherDisciplineData.disciplineId
		}
	});

	return teacherDisciplineByData;
}

export async function createTest(testData: CreateTestData) {
	await prisma.test.create({
		data: {
			name: testData.name,
			pdfUrl: testData.pdfUrl,
			views: testData.views,
			categoryId: testData.categoryId,
			teacherDisciplineId: testData.teacherDisciplineId
		}
	});
}
