import express from 'express';
import loginRouter from './loginRoute.js';
import schoolRoute from './schoolRoute.js';
import professorRoute from './professorRoute.js';
import studentRouter from './studentRoute.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Hello World!')
    })
  
    app.use(
      express.json(),
        loginRouter,
        schoolRoute,
        professorRoute,
        studentRouter
    )
  }
  
  export default routes