
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
dotenv.config();
//signup 
export const signup = async (req, res) => {
   const {fullName, email, password} = req.body;
   // Validate the data
   try {
    if(!fullName || !email || !password){
        return res.status(400).json({message:"Please fill all the fields"});
    }
    if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters long"});
    }
    // Check if the user already exists
   const user =await User.findOne({email});
    if(user){
          return res.status(400).json({message:"User already exists"});
     }
     // Hash the password
     const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullName:fullName,
            password:hashedPassword,
        });

        if(newUser){
            //generate a token here
            generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({
                message:"User created successfully",
                user:{
                    id:newUser._id,
                    email:newUser.email,
                    fullName:newUser.fullName,
                    profilePic:newUser.profilePic,
                },
            });


        }else{
            return res.status(500).json({message:"Error creating user"});
        }

   } catch (error) {
    console.error("Error in signup controller ",error.message);
    return res.status(500).json({message:"Internal server error"});
   }
  
}

//login

export const login = async (req, res) => {
  const {email,password}=req.body;

  try {
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({message : "Invalid credentials"});
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message : "Invalid credentials"});
    }
    //generate a token here
    generateToken(user._id,res)
    res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email:user.email,
        profilePic: user.profilePic,
    })

  } catch (error) {
    console.log("Error in login controllers");
    res.status(500).json({messege:"Internal server error"})
  }  
}
//logout
export const logout = (req, res) => {
 try {
    res.cookie("jwt","",{maxAge : 0});
    res.status(200).json({messege :"Logged out successfully"})
 } catch (error) {
    console.log("Error in logout controller");
    res.status(500).json({messege : "Internal server error"})
 }
}

//update profile
export const updateProfile = async (req, res) => {
    try {
        const {profilePic}=req.body;
        const userId =req.user._id;

        if(!profilePic){
            return res.status(400).json({message:"Please provide a profile picture"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId,{
            profilePic:uploadResponse.secure_url,
        },{new:true});
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("Error in updateProfile controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
};

//check auth
export const checkAuth =(req,res)=>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal server error"});  
    }
}