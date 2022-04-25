import { prisma } from '../database.js';

export async function getAll() {
	const terms = await prisma.term.findMany({
		select: {
			id: true,
			number: true,
			discipline: {
				select: {
					id: true,
					name: true,
					teachersDisciplines: {
						include: {
							teacher: true,
							test: {
								include: {
									category: true
								}
							}
						}
					}
				}
			}
		}
	});

	return terms;
}
