import express from 'express';
import {activateUser, getUserInfo, loginUser, logoutUser, registrationUser, updateAccessToken} from '../controllers/usercontroller'
import { isAutheticated } from '../middleware/auth';
import { getUserById } from '../services/user.service';

const userRouter= express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout",isAutheticated ,logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAutheticated,getUserInfo);




export default userRouter;