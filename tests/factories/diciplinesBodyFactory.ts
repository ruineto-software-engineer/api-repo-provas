import { prisma } from '../../src/database.js';
import { Discipline } from '@prisma/client';

export default async function disciplineBodyFactory() {
	const disciplines = await prisma.discipline.findMany();
	const discipline: Discipline = disciplines[0];

	return discipline;
}
