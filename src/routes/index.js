import express from 'express';
import userRouter from './userRoute.js';

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).send('Hello World!')
    })
  
    app.use(
      express.json(),
        userRouter
    )
  }
  
  export default routes