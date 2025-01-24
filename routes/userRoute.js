import express  from "express"
const userRouter=express.Router()
import { contact, forgotPassword, login, register, resetPassword, users, verifyOtp } from "../controllers/user.js"
import auth from '../auth/auth.js'
//register
userRouter.post("/register",register)
//login
userRouter.post('/login',login)
//all-users
userRouter.get("/users",users)
//contact-us
userRouter.post("/contact-us",contact)
//forgot password
userRouter.post("/forgot-password",forgotPassword)
//verify-otp
userRouter.post("/verify-otp",verifyOtp)
//reset password
userRouter.post("/reset-password",resetPassword)


export default userRouter