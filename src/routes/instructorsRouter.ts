import { Router } from 'express';
import * as instructorsController from '../controllers/instructorsController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const instructorsRouter = Router();

instructorsRouter.use(validateTokenMiddleware);

instructorsRouter.get('/instructors/disciplines', instructorsController.getInstructors);
instructorsRouter.get('/instructors/categories', instructorsController.getInstructorsCategories);
instructorsRouter.get('/instructors/:instructorName', instructorsController.getInstructorsByName);
instructorsRouter.put('/instructors/tests/:testId', instructorsController.updateTestViewsById);

export default instructorsRouter;
