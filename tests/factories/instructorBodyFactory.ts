import { prisma } from '../../src/database.js';
import { Teacher } from '@prisma/client';

export default async function disciplineBodyFactory() {
	const teachers = await prisma.teacher.findMany();
	const teacher: Teacher = teachers[0];

	return teacher;
}
