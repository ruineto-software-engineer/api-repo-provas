import * as instructorsRepository from '../repositories/instructorsRepository.js';
import * as errorsUtils from '../utils/errorsUtils.js';
import * as emailUtils from '../utils/emailUtils.js';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
	
	const emails = await instructorsRepository.getAllEmails();
	const teacher = await instructorsRepository.findTeacherById(teachersDisciplinesData.teacherId);
	const discipline = await instructorsRepository.findDisciplineById(teachersDisciplinesData.disciplineId);
	const category = await instructorsRepository.findCategoryById(testData.categoryId);
	const emailsArray = emails.map(user => user.email);
	const msg = {
		to: emailsArray,
		from: 'ruineto11@gmail.com',
		subject: 'RepoProvas - Nova Prova Adicionada',
		text: emailUtils.generateEmailText(teacher.name, category.name, testData.name, discipline.name)
	};

	try {
		await sgMail.sendMultiple(msg);

		console.log('Emails sent!');
	} catch (error) {
		console.error(error);
	}
}
