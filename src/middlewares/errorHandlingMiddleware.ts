import { NextFunction, Request, Response } from 'express';

export default function errorHandlingMiddleware(error, req: Request, res: Response, next: NextFunction) {
	console.log(error);
	if (error.type === 'error_bad_request') return res.sendStatus(400);
	if (error.type === 'error_unauthorized') return res.sendStatus(401);
	if (error.type === 'error_not_found') return res.sendStatus(404);
	if (error.type === 'error_conflict') return res.sendStatus(409);

	res.sendStatus(500);
}
