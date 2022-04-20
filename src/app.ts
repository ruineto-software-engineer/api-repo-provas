import express, { json, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { prisma } from './database.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());

app.get('/check/:id', async (req: Request, res: Response) => {
	const { id } = req.params;

  const users = await prisma.user.findMany();

	res.send({ id, users });
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on PORT ${process.env.PORT}`);
});
