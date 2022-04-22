import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import router from './routes/index.js';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandlingMiddleware);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on PORT ${process.env.PORT}`);
});
