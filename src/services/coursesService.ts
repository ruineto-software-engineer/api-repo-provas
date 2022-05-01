import * as coursesRepository from '../repositories/coursesRepository.js';
import * as errorsUtils from '../utils/errorsUtils.js';

export async function getDisciplines() {
	const disciplines = await coursesRepository.getAllDisciplines();

	return disciplines;
}

export async function getDisciplinesByName(disciplineName: string) {
	const discipline = await coursesRepository.getDisciplineByName(disciplineName);
	if(!discipline) throw errorsUtils.notFoundError('Discipline Name');
	
	const disciplines = await coursesRepository.getDisciplinesByName(disciplineName);

	return disciplines;
}

export async function updateTestViewsById(testId: number) {
	const test = await coursesRepository.getTest(testId);
	if(!test) throw errorsUtils.notFoundError('Test');

	await coursesRepository.updateTestViewsById(testId);
}
