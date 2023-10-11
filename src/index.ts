import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users.route';
import statusRoute from './routes/status.route';

const app = express();

//* App Config and Middlewares *//
const host = 'http://localhost';
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* Routes Config *//
app.use(statusRoute);
app.use(usersRoute);

//* Server Init *//
app.listen(port, () => { console.log(`Server running in ${host}:${port}`) })