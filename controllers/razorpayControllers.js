import { createRazorpayInstance } from "../config/razorpay.js"
import crypto from 'crypto'
import orderModel from "../models/OrdersModel.js"


const razorpayInstance=createRazorpayInstance()

export const  createOrder=(req,res)=>
{
    
    //do not accept amount from client
    const {amount,}=req.body
    const userId=req.userId
    console.log("am",amount)
    //create an order
    const options=
    {
        amount:amount,
        currency:"INR",
       receipt:"receipt_order_1",
    
   
      
     


    }

    try 
    {
          razorpayInstance.orders.create(options,(err,order)=>
        {
            if (err)
            {
                return res.json({success:false,message:err})
            }
            return res.json({success:true,order})
        })
    }
    catch (error)
    {
        return res.json({success:false,message:"something went wrong"})
    }
}

export const verifyPayment = async (req, res) => {
  const { razorpayPaymentId, razorpayOrderId, razorpaySignature,cart,amount,formData,date } = req.body;
  const userId=req.user
 console.log("ad",formData)
   // Your Razorpay secret key
  console.log('Received Razorpay Response:', { razorpayPaymentId, razorpayOrderId, razorpaySignature });

  // Create HMAC object and compute the generated signature
  const hmac = crypto.createHmac("sha256", "B4wt97kbpmr7DYE0rk81VJ1v");
  hmac.update(razorpayOrderId + "|" + razorpayPaymentId); // Order ID + Payment ID
  const generatedSignature = hmac.digest("hex");

  // Compare the generated signature with the Razorpay signature
  if (generatedSignature === razorpaySignature) {
    // If signatures match, return success response
     const orders= new orderModel(
      {
          items:cart,
          paymentId:razorpayPaymentId,
          orderId:razorpayOrderId,
          amount,
          value:"value",
          reason:"reason",
          userId:userId,
          address:formData,
          date:date
          
      }
     )
     await orders.save();
    return res.json({ success: true, message: "Payment verified" });
  } else {
    // If signatures don't match, return failure response
    return res.json({ success: false, message: "Payment verification failed" });
  }
};
