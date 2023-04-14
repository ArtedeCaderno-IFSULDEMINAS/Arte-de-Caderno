import express from 'express';
import UserController from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/users', UserController.listUser);

export default userRouter;