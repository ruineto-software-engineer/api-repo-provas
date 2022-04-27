import * as coursesRepository from '../repositories/coursesRepository.js';

export async function getDisciplines() {
	const disciplines = await coursesRepository.getAllDisciplines();

	return disciplines;
}

export async function getDisciplinesByName(disciplineName: string) {
	const disciplines = await coursesRepository.getDisciplinesByName(disciplineName);

	return disciplines;
}
