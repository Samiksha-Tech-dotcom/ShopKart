import express from "express";
import {registerUser,loginUser,getUser,logoutUser} from "../controllers/user.register.js"
import  {isAuthenticated}  from "../Middlewares/authmiddleware.js"
 
const userRoutes = express.Router()


userRoutes.post("/signup",registerUser)
userRoutes.post("/login",loginUser)
userRoutes.get('/me' ,isAuthenticated , getUser )
userRoutes.post('/logout' ,logoutUser )



export default userRoutes;

