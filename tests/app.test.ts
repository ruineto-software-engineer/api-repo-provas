import app from '../src/app.js';
import supertest from 'supertest';
import { prisma } from '../src/database.js';

describe('POST /register', () => { 
  beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
	}); 

	afterAll(async () => {
		await prisma.$disconnect();
	});

	it('given a user by the body must register and return 201', async () => {
		const user = {
			email: 'leosilva@gmail.com',
			password: '1234'
		};

		const result = await supertest(app).post('/register').send(user);
		expect(result.status).toEqual(201);
	});

  it('given an existing user should return 409', async () => {
		const user = {
			email: 'leosilva@gmail.com',
			password: '1234'
		};

    await prisma.user.create({
			data: {
				email: user.email,
				password: user.password
			}
		});

		const result = await supertest(app).post('/register').send(user);
		expect(result.status).toEqual(409);
	});

  it('given a user with empty data should return 422', async () => {
		const user = { };

		const result = await supertest(app).post('/register').send(user);
		expect(result.status).toEqual(422);
	});
});

describe('POST /login', () => { 
  beforeEach(async () => {
		await prisma.$executeRaw`TRUNCATE TABLE users CASCADE;`;
	}); 

	afterAll(async () => {
		await prisma.$disconnect();
	});

	it('given a user by the body must register and return 201', async () => {
		const user = {
			email: 'leosilva@gmail.com',
			password: '1234'
		};

    await supertest(app).post('/register').send(user);

		const result = await supertest(app).post('/login').send(user);
		expect(result.status).toEqual(201);
	});

  it('given a non-existent user should return 404', async () => {
		const user = {
			email: 'leonardolins@gmail.com',
			password: '12345'
		};

		const result = await supertest(app).post('/login').send(user);
		expect(result.status).toEqual(404);
	});

  it('given a user with empty data should return 422', async () => {
		const user = { };

		const result = await supertest(app).post('/login').send(user);
		expect(result.status).toEqual(422);
	});

  it('given a user with wrong data should return 401', async () => {
		const user = {
			email: 'ruineto@gmail.com',
			password: '1234'
		};

    const userLogin = {
      email: 'ruineto@gmail.com',
			password: '12345'
    }

    await supertest(app).post('/register').send(user);

		const result = await supertest(app).post('/login').send(userLogin);
		expect(result.status).toEqual(401);
	});
});