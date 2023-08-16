import express from 'express';
import LoginController from '../controllers/LoginController.js';

const loginRouter = express.Router();

loginRouter.get('/login', LoginController.listLogin)
            .post('/login', LoginController.logar)
            //.post('/login2fa', LoginController.Login2FAConfirmed)

            

export default loginRouter;