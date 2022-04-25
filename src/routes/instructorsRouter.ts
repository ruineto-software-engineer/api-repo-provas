import { Router } from 'express';
import * as instructorsController from '../controllers/instructorsController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const instructorsRouter = Router();

instructorsRouter.get('/instructors', validateTokenMiddleware, instructorsController.getInstructors);

export default instructorsRouter;
