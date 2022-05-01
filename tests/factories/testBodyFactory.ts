import { prisma } from '../../src/database.js';
import { faker } from '@faker-js/faker';
import { Category, teachersDisciplines } from '@prisma/client';

interface CreateTestData {
  name: String;
  pdfUrl: String;
  categoryId: Number;
  disciplineId: Number;
  teacherId: Number;
  views: Number;
};

export default async function testBodyFactory(disciplineId: number, teacherId: number) {
	const categories = await prisma.category.findMany();
	const category: Category = categories[0];

	const test: CreateTestData = {
		name: faker.lorem.lines(),
		pdfUrl: faker.internet.url(),
		categoryId: category.id,
		disciplineId,
    teacherId,
		views: 0,
	};

	return test;
}
