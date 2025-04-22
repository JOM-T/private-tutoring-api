import { Router } from "express";
import { forgotPassword, loginUser, registerUser, resetPassword } from "../controllers/regUser.js";

const userRouter = Router();

userRouter.post("/user/register",  registerUser);
userRouter.post("/user/login", loginUser);
userRouter.post("/user/forgot-password", forgotPassword);
userRouter.post("/user/reset-password/:token", resetPassword);

export default userRouter;