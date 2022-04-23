import { Router } from 'express';
import * as coursesController from '../controllers/coursesController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const coursesRouter = Router();

coursesRouter.get('/disciplines', validateTokenMiddleware, coursesController.getDisciplines);

export default coursesRouter;
