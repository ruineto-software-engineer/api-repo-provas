import * as instructorsRepository from '../repositories/instructorsRepository.js';

export async function getInstructors() {
	const instructors = await instructorsRepository.getAll();

	return instructors;
}
