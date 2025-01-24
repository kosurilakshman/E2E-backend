import express from 'express'
import productModel from '../models/productModel.js'

//all products
export const products = async (req, res) => {
    const { title, description, category, qty, price } = req.body;
    console.log("tt",title,"description","cat",category,"qty",qty,"pr",price)
  
    // Get the uploaded image file name
    const image_filename = req.file ? req.file.filename : null;
    console.log("img",image_filename)
  
    try {
      // Check for missing required fields
      if (!title || !description || !price || !qty || !category || !image_filename) {
        return res.json({ success: false, message: "Missing required fields" });
      }
  
      // Create a new product object
      const newProduct = new productModel({
        title,
        description,
        price,
        category,
        qty,
        imgSrc: image_filename
      });
  
      // Save the product to the database
      await newProduct.save();
  
      return res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
      console.error(error); // Log the error to help with debugging
      return res.json({ success: false, message: error.message });
    }
  };
  

//get products
// Get all products from the database
export const allProducts = async (req, res) => {
    try {
      const products = await productModel.find(); // This fetches all products
      console.log(products)
      if (!products || products.length === 0) {
        return res.json({ success: false, message: "No products found" });
      }
      return res.json({ success: true, products });
    } catch (error) {
      console.error(error); // Log the error to help with debugging
      return res.json({ success: false, message: error.message });
    }
  };
  
  
//get single product

export const singleProduct= async(req,res)=>
{
    
    try
    {
     
        const { id } = req.params; 

        const singleProduct= await productModel.findById(id)
        return res.json({success:true,singleProduct})

    }
    catch(err)
    {
        return res.json({success:false,message:err})
    }
}

//update product
export const updateProduct=async(req,res)=>
{
    try
    {
        const id=req.params.id
        const updateProduct=await productModel.findByIdAndUpdate(id,req.body,{new:true})
        return res.json({success:true,updateProduct})

    }
    catch(err)
    {
        return res.json({success:false,message:err})
    }
}

//delete product
export const deletePrduct=async(req,res)=>
    {
        try
        {
            const id=req.params.id
            const deleteProduct=await productModel.findByIdAndDelete(id)
            return res.json({success:true,deleteProduct,message:"product has been deleted"})
    
        }
        catch(err)
        {
            return res.json({success:false})
        }
    }
    
