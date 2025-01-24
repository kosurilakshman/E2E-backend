import productModel from "../models/productModel.js"

export const items= async (req,res)=>
    {
     try
     {
        const foods=await productModel.find({})
        return res.json({success:true,data:foods})
     }
    
     catch (error)
     {
        return res.json({success:false,message:"error"})
     }
    }

    
export const removeItem = async (req, res) => {
   try {
     // Log the request body to verify the ID
     console.log(req.body.image);
     
     // Find the food item by its ID
     const food = await productModel.findById(req.body.id);
 
     // If food item is not found
     if (!food) {
       return res.json({ success: false, message: "Food item not found" });
     }
 
     // Ensure that there is an image path stored in the food item document
     const imagePath = food.image; // Assuming the image is stored in `image` field of the food item
 
     if (imagePath) {
       // Remove the image file from the uploads folder
  
       fs.unlink(imagePath, (err) => {
         if (err) {
           console.error("Error deleting image:", err);
         }
       });
     }
 
     // Delete the food item from the database
     await productModel.findByIdAndDelete(req.body.id);
 
     // Respond with success message
     return res.json({ success: true, message: "Food item removed successfully" });
   } catch (error) {
     // Catch any errors and send response
     console.error(error);
     return res.json({ success: false, message: error.message });
   }
 };
 