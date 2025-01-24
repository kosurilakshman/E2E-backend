import express from "express"
import multer from "multer"
import {  allProducts, deletePrduct, products, singleProduct, updateProduct } from "../controllers/products.js"
// import { addReview, getReview } from "../controllers/review.js";
import auth from "../auth/auth.js"
const productRouter=express.Router()
const storage = multer.diskStorage({
     destination:"uploads",
     filename:(req,file,cb)=>
     {
      return cb(null,`${Date.now()}${file.originalname}`)
     }
  });
  const upload=multer({storage:storage})

//add product
productRouter.post("/addProduct",upload.single("imgSrc"),products)
//get all products
productRouter.get('/all',allProducts)
//get single product
productRouter.get('/:id',singleProduct)
//update product
productRouter.put('/:id',updateProduct)
//delete product by id
productRouter.delete('/:id',deletePrduct)

//get review 
// productRouter.get("/:productId/reviews",auth,getReview)
// // add review
// productRouter.post("/add-review",auth,addReview)
export default productRouter