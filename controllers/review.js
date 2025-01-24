// import Review from "../models/reviewModel.js";

// import productModel from '../models/productModel.js'

// // 1. Get reviews for a product
// export const getReview= async (req, res) => {
//   try {
//     const { productId } = req.params
//     console.log("gid",productId)
//     const reviews = await Review.find({productId }).sort({ createdAt: -1 });
//     if (reviews.length === 0) {
//       return res.status(404).json({ success: false, message: 'No reviews found' });
//     }
//     res.json({ success: true, reviews });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message:err.message });
//   }
// }

// // 2. Add a review for a product
// export const addReview = async (req, res) => {
//   const { productId, text, author } = req.body;

//   // Check if required data is present
//   if (!productId || !text || !author) {
//     return res.status(400).json({ success: false, message: 'Product ID, text, and author are required.' });
//   }

//   try {
//     // Check if the product exists
//     const product = await .findById(productId);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found.' });
//     }

//     // Create the new review
//     const newReview = new Review({
//       productId,
//       text,
//       author
//     });

//     // Save the review to the database
//     await newReview.save();

//     // Return the new review data
//     return res.status(201).json({ success: true, newReview });
//   } catch (error) {
//     console.error('Error adding review:', error);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// };
