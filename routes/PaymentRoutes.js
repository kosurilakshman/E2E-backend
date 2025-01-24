import express from "express"
import auth from "../auth/auth.js"
import { createOrder, verifyPayment } from "../controllers/razorpayControllers.js"
// import Feedback from "../../vite-project/src/pages/Feedback.jsx"

const paymentRouter= express.Router()
paymentRouter.post("/createOrder",createOrder)
paymentRouter.post("/verifyOrder",auth,verifyPayment)
// paymentRouter.post("/feedback",auth,Feedback)
export default paymentRouter