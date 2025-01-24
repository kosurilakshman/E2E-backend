import express from "express"
import { adminLogin, adminRegister } from "../controllers/adminController.js"
import { items, removeItem } from "../controllers/admin.js"
import adminAuth from '../auth/adminAuth.js'

const adminRouter=express.Router()
adminRouter.post("/admin-register",adminRegister)
adminRouter.post("/admin-login",adminLogin)

//get products
adminRouter.get("/get-items",adminAuth,items)
adminRouter.post("/deleteItem",adminAuth,removeItem)

export default adminRouter