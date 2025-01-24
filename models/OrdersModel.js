import mongoose from "mongoose"


const orderSchema=new mongoose.Schema(
    {
            userId:{type:mongoose.Schema.Types.ObjectId,required:true,},
            items:{type:Array,required:true},
            amount:{type:Number,required:true},
            address:{type:Object,required:true},
            status:{type:String,required:true, default:"order placed"},
            // paymentMethod:{type:String,required:true,default:false},
            date:{type:String,required:true},
            paymentId:{type:String,required:true},
            orderId:{type:String,required:true},
    }
)

const orderModel=mongoose.models.order||mongoose.model('order',orderSchema)
export default orderModel