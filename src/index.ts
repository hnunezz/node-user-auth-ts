// import express from 'express';
// import statusRoute from './routes/status.route';
// import usersRoute from './routes/users.route';
// import errorHandler from './middlewares/error-handler.middleware';
// import db from './db';

// const app = express();

// //* App Config and Middlewares *//
// const host = 'http://localhost';
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// //* Routes Config *//
// // app.use('/authentication', authenticationRoute);
// // app.use('/users', jwtAuthenticationMiddleware, usersRoute);

// app.use(statusRoute);

// //* Handler Config *//
// app.use(errorHandler);

// //* Server Init *//
// const server =  app.listen(port, () => { 
//     console.log(`Server running in ${host}:${port}`) 
// });

// process.on('SIGTERM', () => {
//     db.end(() => {
//         console.log('database connection closed!')
//     });
//     server.close(() => {
//         console.log('server on 3000 closed!');
//     });
// })