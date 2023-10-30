import express, { Request, Response } from 'express';
import db from './database';
import errorHanddlerMiddleware from './middlewares/error-handdles.middleware';
import jwtAuthenticationMiddleware from './middlewares/jwt-authentication.middleware';
import authenticationRoute from './routes/authentication.route';
import userRoute from './routes/user.route';

const app = express();

//* App Config and Middlewares *//
const host = 'http://localhost';
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Routes Config *//
app.use('/authentication', authenticationRoute);
app.use('/users', jwtAuthenticationMiddleware, userRoute);


//* Handler Config *//
app.use(errorHanddlerMiddleware);

//* Server Init *//
app.use('/', (req: Request, res: Response) => {
    res.json({ message: 'ok' });
});

const server = app.listen(3000, () => {
    console.log(`Server running in ${host}:${port}`);
});

process.on('SIGTERM', () => {
    db.end(() => {
        console.log('database connection closed!')
    });
    server.close(() => {
        console.log('server on 3000 closed!');
    });
})
