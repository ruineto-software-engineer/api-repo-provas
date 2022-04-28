import { Router } from 'express';
import * as instructorsController from '../controllers/instructorsController.js';
import validateSchemaMiddleware from '../middlewares/validateSchemaMiddleware.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const instructorsRouter = Router();

instructorsRouter.use(validateTokenMiddleware);

instructorsRouter.get('/instructors/disciplines/:disciplineId', instructorsController.getInstructorsByDiscipline);
instructorsRouter.get('/instructors/disciplines', instructorsController.getAllDisciplines);
instructorsRouter.get('/instructors', instructorsController.getInstructors);
instructorsRouter.get('/instructors/categories', instructorsController.getInstructorsCategories);
instructorsRouter.get('/instructors/:instructorName', instructorsController.getInstructorsByName);
instructorsRouter.post(
	'/instructors/tests/create',
	validateSchemaMiddleware,
	instructorsController.createTestByInstructor
);
instructorsRouter.put('/instructors/tests/:testId', instructorsController.updateTestViewsById);

export default instructorsRouter;
