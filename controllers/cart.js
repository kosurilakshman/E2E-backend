import express from "express"
import cartModel from "../models/cartModel.js"
import userModel from "../models/userModel.js"

export const addToCart = async (req, res) => {
  try {
    const { productId, title, price, qty, imgSrc } = req.body;
    // Log the incoming data

    // Validate that required fields are present
    if (!productId || !title || !price || !qty || !imgSrc) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Hardcoded userId for now (replace with real authentication logic)
    const userId = req.user;
    console.log("user",userId)

    // Find user data by userId
    const userData = await userModel.findById(userId);
    
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Initialize cartData to an empty object only if it's undefined
    let cartData = userData.cartData||{}
    console.log(cartData)

    // Check if the product is already in the cart
    if (cartData[productId]>-1) {
      // If product exists in cart, update quantity
      cartData[productId].qty += qty; // Increase the quantity by the qty in the request
    } else {
      // If the product doesn't exist in the cart, add a new product entry
      cartData[productId] = { productId, title, price, qty, imgSrc };
    }

    // Update the user's cart data in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    // Return a success response with the updated cart data
    return res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ success: false, message: error.message || 'Internal Server Error' });
  }
};





export const userCart = async (req, res) => {
    try {
      const userId = req.user; // Replace this with a dynamic userId, e.g., from authentication
      // Find the user by userId
      const cart = await userModel.findById(userId);
      
  
      // Check if the cart exists
      if (!cart) {
        return res.json({ success: false, message: 'Cart not found' });
      }

    
      // Get cartData (empty object if undefined)
      const cartData = cart.cartData
      if (!cartData) {
        return res.json({ success: false, message: 'Cart data not found' })
      }
  
      return res.json({
        success: true,
        message: 'Cart items found',
        cartData,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
//update 
 export const updateQuantity= async(req,res)=>
 {
  try
  {
    const userId=req.user
    const {productId,qty}=req.body
    const cart = await userModel.findById(userId);
    
        // Check if the cart exists
        if (!cart) {
          return res.json({ success: false, message: 'Cart not found' });
        }
    
        // Get cartData (empty object if undefined)
        const cartData = cart.cartData || {};
        cartData[productId].qty=qty
        await userModel.findByIdAndUpdate(userId, { cartData });
  
        // Return a success response
        return res.json({ success: true, message: "Item updated to cart", cartData });
  
  }
  catch (error)
  {
    return res.json({success:false,message:error})
  }

  
 }

 //removeitem from cart

 export const removeQuantity = async (req, res) => {
  try {
    const userId = req.user;
    const { productId } = req.body; // The 'qty' isn't required because we're just decreasing it by 1

    // Fetch the user's cart
    const cart = await userModel.findById(userId);

    // Check if the cart exists
    if (!cart) {
      return res.json({ success: false, message: 'Cart not found' });
    }

    // Get the cartData (use empty object if undefined)
    const cartData = cart.cartData || {};

    // Check if the product exists in the cartData
    if (!cartData[productId]) {
      return res.json({ success: false, message: 'Product not found in cart' });
    }

    // Decrease the quantity if it is greater than 1
    if (cartData[productId].qty>1) {
      cartData[productId].qty -=1;
    } else {
      // If quantity is 1, remove the item from the cart
      delete cartData[productId];
    }

    // Update the user's cartData in the database
    await userModel.findByIdAndUpdate(userId, { cartData });

    // Return a success response with the updated cartData
    return res.json({ success: true, message: "Item quantity updated in cart", cartData });

  } catch (error) {
    console.error("Error:", error);
    return res.json({ success: false, message: error.message || 'Internal Server Error' });
  }
};

 


// Route to remove an item from the cart

export const  clearCart= async(req,res)=>
    {
        const userId="67853af0bf5a4fa2e01a1937"
        const cart= await cartModel.findOne(userId)
        if(!cart)
        {
          cart=new cartModel({items:[]})  
        }
        else
        {
            cart.items=[]
        }
      
        await  cart.save()
        return res.json({success:true,message:"all items  removed from cart",cart})
    }

  export const removeItemFromCart = async (req, res) => {
      try {
        const userId = req.user; // Assuming `req.user` contains the user ID.
        const { productId } = req.body; // Extract the product ID from the request body.
    
        // Fetch the user data and their cart.
        const userData = await userModel.findById(userId);
        if (!userData) {
          return res.json({ success: false, message: "User not found" });
        }
    
        const cartData = userData.cartData || {}; // Get the cart data or default to an empty object.
    
        // Check if the product exists in the cart
        if (cartData.hasOwnProperty(productId)) {
          // If the product exists, remove it entirely from the cartData
          delete cartData[productId];
    
          // Update the cart in the database with the modified cartData.
          await userModel.findByIdAndUpdate(userId, { cartData });
    
          return res.json({ success: true, message: "Item removed from cart" });
        } else {
          return res.json({ success: false, message: "Product not in cart" });
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
        return res.json({ success: false, message: error.message || "An error occurred" });
      }
    };
    
    