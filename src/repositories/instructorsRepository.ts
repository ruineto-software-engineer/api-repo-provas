import { prisma } from '../database.js';

export async function getAll() {
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

export async function getAllCategories() {
	const categories = await prisma.category.findMany();

	return categories;
}
