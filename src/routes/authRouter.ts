import { Router } from "express";
import * as authController from "../controllers/authController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";

const authRouter = Router();

authRouter.post('/login', validateSchemaMiddleware, authController.login);
authRouter.delete('/logout/:userId', authController.logout);

export default authRouter;