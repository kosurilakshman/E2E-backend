import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    stars: { type: Number, required: true }, // Define 'stars' as a number
    message: { type: String, required: true } // Define 'message' as a string
});

const feedbackModel=mongoose.model("feedback",userSchema);
export default feedbackModel