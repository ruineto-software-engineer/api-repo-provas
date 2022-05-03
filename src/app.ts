import express, { json } from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import router from './routes/index.js';
import errorHandlingMiddleware from './middlewares/errorHandlingMiddleware.js';

const app = express();

app.use(cors());
app.use(json());
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
app.use(router);
app.use(errorHandlingMiddleware);

export default app;
