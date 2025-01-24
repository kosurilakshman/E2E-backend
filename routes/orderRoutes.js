import express from "express"
import { feedback, getAllOrders, getOrders, orderCancel, updateOrder, } from "../controllers/orderController.js"
import auth from "../auth/auth.js"
import adminAuth from "../auth/adminAuth.js"
const orderRouter=express.Router()
//get orders
orderRouter.get("/orders",auth,getOrders)
orderRouter.get("/allOrders",adminAuth,getAllOrders)
orderRouter.post("/order-status",adminAuth,updateOrder)
orderRouter.post("/feedback",auth,feedback)
orderRouter.post("/cancel-order",auth,orderCancel)
export default orderRouter