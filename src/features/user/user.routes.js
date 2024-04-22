import UserController from "./user.controller.js";
import express from 'express';

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);


export default userRouter;