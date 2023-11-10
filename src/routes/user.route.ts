import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/user.model';
import userRepository from '../repositories/user.repository';
import jwtAuthenticationMiddleware from "../middlewares/jwt-authentication.middleware";

/*
    GET     -   /users
    GET     -   /users/:uuid 
    POST    -   /users 
    PUT     -   /users/:uuid
    DELETE  -   /users/:uuid 

*/

const usersRoute = Router();

usersRoute.get(
    "/users",
    jwtAuthenticationMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await userRepository.findAllUsers();
      res.status(StatusCodes.OK).send({ users });
    }
  );
  
  usersRoute.get(
    "/users/:uuid",
    async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
      try {
        const uuid = req.params.uuid;
        const user = await userRepository.findByUuid(uuid);
  
        res.status(StatusCodes.OK).send(user);
      } catch (error) {
        next(error);
      }
    }
  );
  
  usersRoute.post(
    "/users",
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = req.body;
  
      const uuid = await userRepository.create(newUser);
  
      res.status(StatusCodes.CREATED).send(uuid);
    }
  );
  
  usersRoute.put(
    "/users/:uuid",
    async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
      const uuid = req.params.uuid;
      const modifiedUser = req.body;
  
      modifiedUser.uuid = uuid;
  
      await userRepository.update(modifiedUser);
  
      res.status(StatusCodes.OK).send();
    }
  );
  
  usersRoute.delete(
    "/users/:uuid",
    async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
      const uuid = req.params.uuid;
  
      await userRepository.remove(uuid);
  
      res.sendStatus(StatusCodes.OK);
    }
  );
  
// usersRoute.get('/users', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
//     try {
//         const uuid = req.params.uuid;
//         const user: User | null = await userRepository.findByUuid(uuid);

//         if (!user) {
//             return res.sendStatus(StatusCodes.NO_CONTENT);
//         }

//         return res.status(StatusCodes.OK).json(user);
//     } catch (error) {
//         return next(error);
//     }
// });
// usersRoute.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
//     try {
//         const uuid = req.params.uuid;
//         const user: User | null = await userRepository.findByUuid(uuid);

//         if (!user) {
//             return res.sendStatus(StatusCodes.NO_CONTENT);
//         }

//         return res.status(StatusCodes.OK).send(user);
//     } catch (error) {
//         return next(error);
//     }
// });

// usersRoute.post('/', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user: User = req.body;
//         const uuid = await userRepository.create(user);
//         return res.status(StatusCodes.CREATED).send(uuid);
//     } catch (error) {
//         return next(error);
//     }
// });

// usersRoute.put('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
//     try {
//         const uuid = req.params.uuid;
//         const user: User = req.body;
//         user.uuid = uuid;
//         const updatedUser = await userRepository.update(user);
//         return res.status(StatusCodes.OK).json(updatedUser);
//     } catch (error) {
//         return next(error);
//     }
// });

// usersRoute.delete('/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
//     try {
//         const uuid = req.params.uuid;
//         await userRepository.remove(uuid);
//         return res.sendStatus(StatusCodes.OK);
//     } catch (error) {
//         return next(error);
//     }
// });

export default usersRoute;
