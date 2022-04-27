import { prisma } from '../database.js';

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
