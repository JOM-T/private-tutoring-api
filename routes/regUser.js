import { Router } from "express";
import { loginUser, registerUser } from "../controllers/regUser.js";
import { isAuthenticated } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.post("/user/register",  registerUser);
userRouter.post("/user/login", loginUser);

export default userRouter;