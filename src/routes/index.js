import express from 'express';
import loginRouter from './loginRoute.js';
import schoolRoute from './schoolRoute.js';
import professorRoute from './professorRoute.js';
import studentRoute from './studentRoute.js';
import registerRoute from './registerRoute.js';
import drawRoute from './drawRoute.js';
import cepRoute from './cepRoute.js';
import validatorCpfRoute from './validatorCpfRoute.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send('Hello World!')
  })

  app.use(
    express.json(),
    validatorCpfRoute,
    cepRoute,
    registerRoute,
    loginRouter,
    schoolRoute,
    professorRoute,
    studentRoute,
    drawRoute
  )
}

export default routes