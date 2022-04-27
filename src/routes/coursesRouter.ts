import { Router } from 'express';
import * as coursesController from '../controllers/coursesController.js';
import validateTokenMiddleware from '../middlewares/validateTokenMiddleware.js';

const coursesRouter = Router();

coursesRouter.use(validateTokenMiddleware);

coursesRouter.get('/disciplines', coursesController.getDisciplines);
coursesRouter.get('/disciplines/:disciplineName', coursesController.getDisciplinesByName);
coursesRouter.put('/disciplines/tests/:testId', coursesController.updateTestViewsById);

export default coursesRouter;
