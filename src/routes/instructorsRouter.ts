import { Router } from 'express';
import * as instructorsController from '../controllers/instructorsController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const instructorsRouter = Router();

instructorsRouter.get('/instructors/disciplines', validateTokenMiddleware, instructorsController.getInstructors);
instructorsRouter.get('/instructors/categories', validateTokenMiddleware, instructorsController.getInstructorsCategories);
instructorsRouter.get('/instructors/:instructorName', validateTokenMiddleware, instructorsController.getInstructorsByName);

export default instructorsRouter;
