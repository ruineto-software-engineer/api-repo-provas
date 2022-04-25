import { prisma } from '../database.js';

export async function getAll() {
	const teachers = await prisma.teacher.findMany({
		select: {
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
