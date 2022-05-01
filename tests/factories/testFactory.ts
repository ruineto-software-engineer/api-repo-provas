import { prisma } from '../../src/database.js';
import { faker } from "@faker-js/faker";
import { Test, Category, teachersDisciplines } from '@prisma/client';

export default async function testFactory(disciplineId: number, teacherId: number) {
	const teacherDiscipline: teachersDisciplines = await prisma.teachersDisciplines.create({
		data: {
			teacherId: disciplineId,
			disciplineId: teacherId
		}
	});

	const categories = await prisma.category.findMany();
	const category: Category = categories[0];

	const test: Test = await prisma.test.create({
		data: {
			name: faker.lorem.lines(),
			pdfUrl: faker.internet.url(),
			categoryId: category.id,
			teacherDisciplineId: teacherDiscipline.id,
      views: 0
		}
	});

  return test;
}
