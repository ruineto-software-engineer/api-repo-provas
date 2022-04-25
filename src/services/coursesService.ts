import * as coursesRepository from '../repositories/coursesRepository.js';

export async function getDisciplines() {
	const disciplines = await coursesRepository.getAll();

	return disciplines;
}
