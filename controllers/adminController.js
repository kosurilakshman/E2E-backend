import adminModel from '../models/adminModel.js'
import  jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer.js";
import bcrypt from 'bcryptjs'

export const adminRegister = async (req, res) => {
  const { name, email, phno, password } = req.body;
  console.log(name, email, phno, password);
  console.log(req.body);

  // Checking if name, email, phno, or password are empty or not
  if (!name || !email || !phno || !password) {
    return res.status(400).json({ success: false, message: "Enter all details" }); // 400 Bad Request for missing data
  }

  try {
    const userExist = await adminModel.findOne({ email });

    // Checking if the user exists
    if (userExist) {
      return res.status(409).json({ success: false, message: "User already exists" }); // 409 Conflict if user exists
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate verification OTP
    const verificationCode = Math.floor(100000 + Math.random() * 9000).toString();

    // Create a new user
    const user = new adminModel({
      name,
      email,
      phno,
      password: hashPassword,
      verifyOtp: verificationCode,
    });

    // Save the user
    await user.save();

    // Create a JWT token
    const token = jwt.sign({ id: user._id }, 'secret@key', {
      expiresIn: "7d",
    });

    // Send the verification email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Raithana Dairy",
      text: `Welcome to Raithana Dairy. Your account was created with email: ${email}`,
      html: `Your OTP code for verification is: ${user.verifyOtp}`,
    };

    await transporter.sendMail(mailOptions);

    // Return success response with token (ensure content is sent)
    return res.status(201).json({ success: true, message: 'Registration successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


 // Import required packages

// CORS middleware (if you're not using it globally)

// Admin login function



    // Sending email (optional

    export const adminLogin = async (req, res) => {
      const { email, password } = req.body;
      console.log("rb",req.body);
      console.log("ad",process.env.ADMIN_EMAIL)
      // Checking if email and password are provided
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
      }
    
      try {
        // Check if the provided email and password match the admin's credentials
        if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
          // Generate token for admin
          const token = jwt.sign(
            email+password, // You can use a fixed value for the admin's ID
            'secret@key'// Secret key for signing the JWT (use a stronger key in production)

          );
    
          // Send response with the token
          return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token, // Send the token in the response
          });
        } else {
          // If credentials don't match
          return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
      }
    };
    
    
