import mongoose, { Schema } from 'mongoose';

// Define the user schema
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no two users have the same email
      match: [/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, 'Please enter a valid email address'], // Email validation regex
    },
    phno: { type: String, required:false },
    password: { type: String, required: true },
    otp:{type:String,default:null},
    cartData: { type: Schema.Types.Mixed }, // Remove default initialization
    createdAt: { type: Date, default: Date.now }, // Use Date.now without parentheses
  },
  { minimize: false } // Ensures empty objects are not removed
);

// Create a model for the user schema
const userModel = mongoose.model('userdb', userSchema);

// Export the model for use in other parts of your application
export default userModel;
