import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from '../src/database.js';
import { faker } from '@faker-js/faker';
import userFactory from './factories/userFactory.js';
import userBodyFactory from './factories/userBodyFactory.js';

describe('User tests: POST /register', () => {
	beforeEach(truncateUsers);

	afterAll(disconnect);

	it('should return 201 and persist the user given a valid body', async () => {
		// Arrange, Act, Assert (A A A)
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

		const response = await supertest(app).post('/sign-in').send(body);

		expect(response.status).toEqual(401);
	});

	it('should return 401 given invalid password', async () => {
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/sign-in').send({
			...body,
			password: '1234567'
		});

		expect(response.status).toEqual(401);
	});
});

describe('Discipline search tests: GET /disciplines/:displineName', () => {
	it('should return 401 given invalid token', async () => {
		const displineName = faker.name.firstName();

		const response = await supertest(app).get(`/disciplines/${displineName}`);

		expect(response.status).toEqual(401);
	});

	it('should return 200 and a token given valid credentials', async () => {
		const displineName = 'HTML';
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/disciplines/${displineName}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
	});

	it('should return 404 given invalid discipline name', async () => {
		const displineName = faker.name.firstName();
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/disciplines/${displineName}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(404);
	});

	it('should return 200 and a token given valid discipline name', async () => {
		const displineName = 'HTML';
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/disciplines/${displineName}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
		expect(result.body.length).toBeGreaterThan(0);
	});
});

describe('Instructor search tests: GET /instructors/:instructorName', () => {
	it('should return 401 given invalid token', async () => {
		const instructorName = faker.name.firstName();

		const response = await supertest(app).get(`/instructors/${instructorName}`);

		expect(response.status).toEqual(401);
	});

	it('should return 200 and a token given valid credentials', async () => {
		const instructorName = 'Fulano';
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/instructors/${instructorName}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
	});

	it('should return 404 given invalid instructor name', async () => {
		const instructorName = faker.name.firstName();
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/instructors/${instructorName}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(404);
	});

	it('should return 200 and a token given valid instructor name', async () => {
		const instructorName = 'Fulano';
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.get(`/instructors/${instructorName}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
		expect(result.body.length).toBeGreaterThan(0);
	});
});

describe('Test disciplines update views tests: PUT /disciplines/tests/:testId', () => {
	it('should return 401 given invalid token', async () => {
		const testId = 1;

		const response = await supertest(app).get(`/instructors/${testId}`);

		expect(response.status).toEqual(401);
	});

	it('should return 200 and a token given valid credentials', async () => {
		const testId = 29;
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.put(`/disciplines/tests/${testId}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
	});

	it('should return 404 given invalid test id', async () => {
		const testId = 99999;
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.put(`/disciplines/tests/${testId}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(404);
	});

	it('should return 200 and a token given valid test id', async () => {
		const testId = 30;
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const currentTest = await prisma.test.findUnique({
			where: {
				id: testId
			}
		});

		const result = await supertest(app)
			.put(`/disciplines/tests/${testId}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		const updatedTest = await prisma.test.findUnique({
			where: {
				id: testId
			}
		});

		expect(result.status).toEqual(200);
		expect(updatedTest.views).toEqual(currentTest.views + 1);
	});
});

describe('Test instructors update views tests: PUT /instructors/tests/:testId', () => {
	it('should return 401 given invalid token', async () => {
		const testId = 12;

		const response = await supertest(app).get(`/instructors/tests/${testId}`);

		expect(response.status).toEqual(401);
	});

	it('should return 200 and a token given valid credentials', async () => {
		const testId = 31;
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.put(`/instructors/tests/${testId}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(200);
	});

	it('should return 404 given invalid test id', async () => {
		const testId = 99999;
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.put(`/instructors/tests/${testId}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(404);
	});

	it('should return 200 and a token given valid test id', async () => {
		const testId = 30;
		const body = userBodyFactory();
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const currentTest = await prisma.test.findUnique({
			where: {
				id: testId
			}
		});

		const result = await supertest(app)
			.put(`/instructors/tests/${testId}`)
			.set('Authorization', `Bearer ${response.body.token}`);

		const updatedTest = await prisma.test.findUnique({
			where: {
				id: testId
			}
		});

		expect(result.status).toEqual(200);
		expect(updatedTest.views).toEqual(currentTest.views + 1);
	});
});

describe('Test create tests: POST /instructors/tests/create', () => {
	it('should return 401 given invalid token', async () => {
		const response = await supertest(app).post(`/instructors/tests/create`);

		expect(response.status).toEqual(401);
	});

	it('should return 201 and a token given valid credentials', async () => {
		const body = userBodyFactory();
		const test = {
			name: '2022 - globo.com - versão 6',
			pdfUrl: 'https://bootcampra.notion.site/Projeto-01-Globo-com-3cbb21447e9c4cebaca7f8ace22da178',
			categoryId: 1,
			views: 0,
			disciplineId: 1,
			teacherId: 1
		};
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.post('/instructors/tests/create')
			.send(test)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(201);
	});

	it('should return 422 given a invalid body', async () => {
		const body = userBodyFactory();
		const test = {};
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

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
		const body = userBodyFactory();
		const test = {
			name: '2022 - globo.com - versão 6',
			pdfUrl: 'https://bootcampra.notion.site/Projeto-01-Globo-com-3cbb21447e9c4cebaca7f8ace22da178',
			categoryId: 1,
			views: 0,
			disciplineId: 1,
			teacherId: 1
		};
		await userFactory(body);

		const response = await supertest(app).post('/login').send(body);

		expect(response.status).toEqual(200);
		expect(typeof response.body.token).toEqual('string');
		expect(response.body.token.length).toBeGreaterThan(0);

		const result = await supertest(app)
			.post('/instructors/tests/create')
			.send(test)
			.set('Authorization', `Bearer ${response.body.token}`);

		expect(result.status).toEqual(201);
	});
});

async function disconnect() {
	await prisma.$disconnect();
}

async function truncateUsers() {
	await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
}
