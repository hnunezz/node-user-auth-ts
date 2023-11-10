
import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import JWT, { SignOptions } from 'jsonwebtoken';
import basicAuthMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";
import { ForbiddenError } from "../errors/forbidden.error";

const authorizationRoute = Router();

authorizationRoute.post('/token/validate', jwtAuthenticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

authorizationRoute.post('/token', basicAuthMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;

        if (!user) {
            console.log('teste');
        }

        const jwtPayload = { username: user?.username };
        const secretKey = 'my_secret_key';
        const jwtOptions: SignOptions = { subject: user?.uuid, expiresIn: 600000 };

        const token = JWT.sign(jwtPayload, secretKey, jwtOptions);

        return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
        next(error);
    }
});

export default authorizationRoute;
