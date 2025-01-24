import Razorpay from "razorpay";
export const createRazorpayInstance=()=>
{
    return new Razorpay(
        {
        key_id:"rzp_test_11krXBMmubInXJ",
        key_secret:"B4wt97kbpmr7DYE0rk81VJ1v"
        }
       
    )
}
