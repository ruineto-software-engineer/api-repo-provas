import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from '../src/database.js';
import { faker } from '@faker-js/faker';
import { jest } from '@jest/globals';
import userFactory from './factories/userFactory.js';
import userBodyFactory from './factories/userBodyFactory.js';
import diciplinesBodyFactory from './factories/diciplinesBodyFactory.js';
import instructorBodyFactory from './factories/instructorBodyFactory.js';
import testFactory from './factories/testFactory.js';
import testBodyFactory from './factories/testBodyFactory.js';

describe('User tests: POST /register', () => {
	beforeEach(truncateUsers);

	afterAll(disconnect);

	it('should return 201 and persist the user given a valid body', async () => {
		const body = userBodyFactory();

		const result = await supertest(app).post('/register').send(body);
		const user = await prisma.user.findUnique({
			where: {
				email: body.email
			}
		});

		expect(result.status).toEqual(201);
		expect(user).not.toBeNull();
	});

	it('should return 422 given a invalid body', async () => {
		const body = {};

		const result = await supertest(app).post('/register').send(body);
		expect(result.status).toEqual(422);
	});

	it('should return 409 given a duplicate email', async () => {
		const body = userBodyFactory();

		await supertest(app).post('/register').send(body);
		const result = await supertest(app).post('/register').send(body);
		const users = await prisma.user.findMany({
			where: {
				email: body.email
			}
		});

		expect(result.status).toEqual(409);
		expect(users.length).toEqual(1);
	});
});

describe('User tests: POST /login', () => {
	beforeEach(truncateUsers);

	afterAll(disconnect);

	it('should return 200 and a token given valid credentials', async () => {
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);
	});

	it('should return 401 given invalid email', async () => {
		const body = userBodyFactory();

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(401);
	});

	it('should return 401 given invalid password', async () => {
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send({
			...body,
			password: faker.internet.password()
		});

		expect(response.status).toEqual(401);
	});
});

describe('Discipline search tests: GET /disciplines/:displineName', () => {
	beforeEach(truncateUsers);

	afterAll(disconnect);

	it('should return 401 given invalid token', async () => {
		const displineName = faker.name.firstName();

		const response = await supertest(app).get(`/disciplines/${displineName}`);

		expect(response.status).toEqual(401);
	});

	it('should return 200 and a token given valid credentials', async () => {
		const dicipline = await diciplinesBodyFactory();
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/disciplines/${dicipline.name}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
	});

	it('should return 404 given invalid discipline name', async () => {
		const diciplineName = faker.name.firstName();
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/disciplines/${diciplineName}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(404);
	});

	it('should return 200 and a token given valid discipline name', async () => {
		const dicipline = await diciplinesBodyFactory();
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/disciplines/${dicipline.name}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
		expect(result.body.length).toBeGreaterThan(0);
	});
});

describe('Instructor search tests: GET /instructors/:instructorName', () => {
	beforeEach(truncateUsers);

	afterAll(disconnect);

	it('should return 401 given invalid token', async () => {
		const instructorName = faker.name.firstName();

		const response = await supertest(app).get(`/instructors/${instructorName}`);

		expect(response.status).toEqual(401);
	});

	it('should return 200 and a token given valid credentials', async () => {
		const instructor = await instructorBodyFactory();
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/instructors/${instructor.name}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
	});

	it('should return 404 given invalid instructor name', async () => {
		const instructorName = faker.name.firstName();
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/instructors/${instructorName}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(404);
	});

	it('should return 200 and a token given valid instructor name', async () => {
		const instructor = await instructorBodyFactory();
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/instructors/${instructor.name}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
		expect(result.body.length).toBeGreaterThan(0);
	});
});

describe('Test disciplines update views tests: PUT /disciplines/tests/:testId', () => {
	beforeEach(truncateUsers);
	beforeEach(truncateTests);

	afterAll(disconnect);

	it('should return 401 given invalid token', async () => {
		const testId = 1;

		const response = await supertest(app).get(`/instructors/${testId}`);

		expect(response.status).toEqual(401);
	});

	it('should return 200 and a token given valid credentials', async () => {
		const discipline = await diciplinesBodyFactory();
		const instructor = await instructorBodyFactory();
		const test = await testFactory(discipline.id, instructor.id);
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.put(`/disciplines/tests/${test.id}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
	});

	it('should return 404 given invalid test id', async () => {
		const testId = 999;
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.put(`/disciplines/tests/${testId}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(404);
	});

	it('should return 200 and a token given valid test id', async () => {
		const discipline = await diciplinesBodyFactory();
		const instructor = await instructorBodyFactory();
		const test = await testFactory(discipline.id, instructor.id);
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const currentTest = await prisma.test.findUnique({
			where: {
				id: test.id
			}
		});

		const result = await supertest(app)
			.put(`/disciplines/tests/${test.id}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		const updatedTest = await prisma.test.findUnique({
			where: {
				id: test.id
			}
		});

		expect(result.status).toEqual(200);
		expect(updatedTest.views).toEqual(currentTest.views + 1);
	});
});

describe('Test instructors update views tests: PUT /instructors/tests/:testId', () => {
	beforeEach(truncateUsers);
	beforeEach(truncateTests);

	afterAll(disconnect);

	it('should return 401 given invalid token', async () => {
		const testId = 12;

		const response = await supertest(app).get(`/instructors/tests/${testId}`);

		expect(response.status).toEqual(401);
	});

	it('should return 200 and a token given valid credentials', async () => {
		const discipline = await diciplinesBodyFactory();
		const instructor = await instructorBodyFactory();
		const test = await testFactory(discipline.id, instructor.id);
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.put(`/instructors/tests/${test.id}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
	});

	it('should return 404 given invalid test id', async () => {
		const testId = 99999;
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.put(`/instructors/tests/${testId}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(404);
	});

	it('should return 200 and a token given valid test id', async () => {
		const discipline = await diciplinesBodyFactory();
		const instructor = await instructorBodyFactory();
		const test = await testFactory(discipline.id, instructor.id);
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const currentTest = await prisma.test.findUnique({
			where: {
				id: test.id
			}
		});

		const result = await supertest(app)
			.put(`/instructors/tests/${test.id}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		const updatedTest = await prisma.test.findUnique({
			where: {
				id: test.id
			}
		});

		expect(result.status).toEqual(200);
		expect(updatedTest.views).toEqual(currentTest.views + 1);
	});
});

describe('Test create tests: POST /instructors/tests/create', () => {
	beforeEach(truncateUsers);
	beforeEach(truncateTests);

	afterAll(disconnect);

	it('should return 401 given invalid token', async () => {
		const response = await supertest(app).post(`/instructors/tests/create`);

		expect(response.status).toEqual(401);
	});

	it('should return 201 and a token given valid credentials', async () => {
		const discipline = await diciplinesBodyFactory();
		const instructor = await instructorBodyFactory();
		const test = await testBodyFactory(discipline.id, instructor.id);
		const user = userBodyFactory();
		await userFactory(user);

		const logSpy = jest.spyOn(console, 'log');

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.post('/instructors/tests/create')
			.send(test)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(201);

		console.log('Emails sent!');

		expect(logSpy).toHaveBeenCalledWith('Emails sent!');
	});

	it('should return 422 given a invalid body', async () => {
		const test = {};
		const user = userBodyFactory();
		await userFactory(user);

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.post('/instructors/tests/create')
			.send(test)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(422);
	});

	it('should return 201 and a token given valid body', async () => {
		const discipline = await diciplinesBodyFactory();
		const instructor = await instructorBodyFactory();
		const test = await testBodyFactory(discipline.id, instructor.id);
		const user = userBodyFactory();
		await userFactory(user);

		const logSpy = jest.spyOn(console, 'log');

		const response = await supertest(app).post('/login').send(user);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.post('/instructors/tests/create')
			.send(test)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(201);

		console.log('Emails sent!');

		expect(logSpy).toHaveBeenCalledWith('Emails sent!');
	});
});

async function disconnect() {
	await prisma.$disconnect();
}

async function truncateUsers() {
	await prisma.$executeRaw`TRUNCATE TABLE users, sessions;`;
}

async function truncateTests() {
	await prisma.$executeRaw`TRUNCATE TABLE tests, "teachersDisciplines";`;
}
