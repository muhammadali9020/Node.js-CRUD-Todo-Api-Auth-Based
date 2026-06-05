import express from "express";
import userSignUp from "../controllers/userSignUp.js";
import userSignIn from "../controllers/userSignIn.js";
import userLogOut from "../controllers/userLogOut.js";
const router=express.Router()
// route for user register 
router.post('/signup',userSignUp)
// route for user login 
router.post('/signin',userSignIn)
// route for user logout 
router.post('/logout',userLogOut)

export default router