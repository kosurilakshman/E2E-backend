import express from "express"
import { addToCart, clearCart,  removeItemFromCart, removeQuantity, updateQuantity, userCart } from "../controllers/cart.js"
import auth from "../auth/auth.js"
const cartRouter= express.Router()



//add to cart
cartRouter.post('/cart',auth,addToCart)
// get cart item by user id
cartRouter.get('/usercart',auth,userCart)
//delete cart
cartRouter.post('/removeCart',auth,removeItemFromCart)
//clear cart
cartRouter.delete('/clearCart',auth,clearCart)
//quantity increase
cartRouter.post('/updateCart',auth,updateQuantity)
//quantity decrease
cartRouter.post('/decreaseQuantity',auth,removeQuantity)

export default cartRouter