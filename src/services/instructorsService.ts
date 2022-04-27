import * as instructorsRepository from '../repositories/instructorsRepository.js';

export async function getInstructors() {
	const instructors = await instructorsRepository.getInstructors();

	return instructors;
}

export async function getInstructorsCategories() {
	const categories = await instructorsRepository.getAllCategories();

	return categories;
}

export async function getInstructorsByName(instructorName: string) {
	const instructors = await instructorsRepository.getInstructorsByName(instructorName);

	return instructors;
}

export async function updateTestViewsById(testId: number) {
	await instructorsRepository.updateTestViewsById(testId);
}
