import express from "express";
import { loginUser, logoutUser, registerUser, verifyUser } from "../usercontrollers/usercontroller.js";

const usersRoute = express.Router();

usersRoute.post('/register-User',registerUser)
usersRoute.get('/verify-User',verifyUser)
usersRoute.post('/login-User',loginUser)
usersRoute.post('/logout-User',logoutUser)

export default usersRoute