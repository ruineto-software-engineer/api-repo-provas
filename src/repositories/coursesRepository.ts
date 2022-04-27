import { prisma } from '../database.js';

export async function getAllDisciplines() {
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

export async function getDisciplinesByName(disciplineName: string) {
	const termsByDisciplines = await prisma.term.findMany({
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
				},
				where: {
					name: {
						contains: disciplineName,
						mode: 'insensitive'
					}
				}
			}
		}
	});

	return termsByDisciplines;
}
