import mongoose from "mongoose";


const cartItemsSchema= new mongoose.Schema(
    {
        productId:{type:mongoose.Schema.Types.ObjectId,ref:"products",required:true},
        title:{type:String,required:true},
        price:{type:Number,required:true},
        qty:{type:Number,required:true},
        imgSrc:{type:String,required:true},
        createdAt:{type:Date,default:Date.now}

    }
)


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Userdb",
    required:true,
  },
  items: { type: [] },
});

const cartModel=mongoose.model("cart",cartSchema)
export default cartModel
