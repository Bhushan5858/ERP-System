import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

export const signup = async(req,res)=>{
    const {name,email,password}=req.body;
  
    try {
        
        // Check if email or username already exists
        let existingUser = await User.findOne({email:email});
        if (existingUser) return res.status(400).json({message:"Email already exists"});

        //Hash Password
        const salt =await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create new user with default role as "Developer"
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role:"Developer"
        })

        await newUser.save();

        res.status(201).json({message:"User Created Successfully",user:newUser});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
        
    }
}