
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../lib/utils.js";
dotenv.config();

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



export const login = (req, res) => {
    res.send("login route");
}
export const logout = (req, res) => {
    res.send("logout route");
}