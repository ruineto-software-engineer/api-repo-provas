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

export async function getDisciplineByName(disciplineName: string) {
	const discipline = await prisma.discipline.findFirst({
		where: {
			name: disciplineName
		}
	});

	return discipline;
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
