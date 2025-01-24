import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const auth = async (req, res, next) => {
  const token = req.header("auth");
  if (!token) {
    return res.status(401).json({ success: false, message: "Please login" }); //// Log token for debugging
  }

  try {
    const decoded = jwt.verify(token, 'secret@key');
    const user = await userModel.findById(decoded.userId);//log decoded to check payload
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    req.user = user.id;//log getting user id from database
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid or expired token" });
  }
};

export default auth;
