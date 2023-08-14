import express from 'express';
import loginRouter from './loginRoute.js';
import schoolRoute from './schoolRoute.js';
import professorRoute from './professorRoute.js';
import studentRouter from './studentRoute.js';
import registerRoute from './registerRoute.js';
import cepRouter from './cepRoute.js';
import validatorCpfRouter from './validatorCpfRoute.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('Hello World!')
  })

  app.use(
    express.json(),
    validatorCpfRouter,
    cepRouter,
    registerRoute,
    loginRouter,
    schoolRoute,
    professorRoute,
    studentRouter
  )
}

export default routes