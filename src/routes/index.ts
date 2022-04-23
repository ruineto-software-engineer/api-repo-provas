import { Router } from 'express';
import authRouter from './authRouter.js';
import coursesRouter from './coursesRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use(authRouter);
router.use(userRouter);
router.use(coursesRouter);

export default router;
