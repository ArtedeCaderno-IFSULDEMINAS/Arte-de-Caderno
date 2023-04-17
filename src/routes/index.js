import express from 'express';
import loginRouter from './loginRoute.js';
import schoolRoute from './schoolRoute.js';
import professorRoute from './professorRoute.js';
import studentRouter from './studentRoute.js';
import cepRouter from './cepRoute.js';
import validatorCpfRouter from './validatorCpfRoute.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Hello World!')
    })
  
    app.use(
      express.json(),
        loginRouter,
        schoolRoute,
        professorRoute,
        studentRouter,
        cepRouter,
        validatorCpfRouter
    )
  }
  
  export default routes