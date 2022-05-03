import * as instructorsRepository from '../repositories/instructorsRepository.js';
import * as errorsUtils from '../utils/errorsUtils.js';

export type CreateNewTeacherDisciplineData = Omit<instructorsRepository.CreateTeacherDisciplineData, 'id'>;
export type CreateNewTestData = Omit<Omit<instructorsRepository.CreateTestData, 'id'>, 'teacherDisciplineId'>;

export async function getInstructors() {
	const instructors = await instructorsRepository.getInstructors();

	return instructors;
}

export async function getInstructorsCategories() {
	const categories = await instructorsRepository.getAllCategories();

	return categories;
}

export async function getInstructorsByName(instructorName: string) {
	const instructor = await instructorsRepository.getInstructorByName(instructorName);
	if(!instructor) throw errorsUtils.notFoundError('Instructor Name');

	const instructors = await instructorsRepository.getInstructorsByName(instructorName);

	return instructors;
}

export async function updateTestViewsById(testId: number) {
	const test = await instructorsRepository.getTest(testId);
	if(!test) throw errorsUtils.notFoundError('Test');

	await instructorsRepository.updateTestViewsById(testId);
}

export async function getAllDisciplines() {
	const disciplines = await instructorsRepository.getAllDisciplines();

	return disciplines;
}

export async function getInstructorsByDiscipline(disciplineId: number) {
	const instructorsByDiscipline = await instructorsRepository.getInstructorsByDiscipline(disciplineId);

	return instructorsByDiscipline;
}

export async function createTestByInstructor(
	teachersDisciplinesData: CreateNewTeacherDisciplineData,
	testData: CreateNewTestData
) {
	const teacherDisciplineByData = await instructorsRepository.createTeachersDisciplines(teachersDisciplinesData);

	await instructorsRepository.createTest({
		...testData,
		teacherDisciplineId: teacherDisciplineByData.id
	});
}
