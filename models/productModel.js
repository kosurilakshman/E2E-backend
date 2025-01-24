import mongoose, { Schema } from "mongoose";

const productSchema=new Schema(
    { 
        title:{type:String,required:true},
        description:{type:String,reqired:true},
        price:{type:Number,required:true},
        category:{type:String,required:true},
        qty:{type:Number,default:0,required:true},
        imgSrc:{type:String,required:true},
        createdAt:{type:Date,default:Date.now}
        
    }
)

const productModel= mongoose.model("products",productSchema)
export default productModel