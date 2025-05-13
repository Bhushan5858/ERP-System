import { generateToken } from "../Middleware/JWT.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";

export const addUser= async(req,res)=>{

    //check if user is admin
    if(req.userData.role !== "Admin") return res.status(403).json({message:"Access Denied"});

    
    const {name,email,password,role}=req.body;
  
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
            role,
        })

        await newUser.save();

        res.status(201).json({message:"User Created Successfully",user:newUser});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
        
    }
}


export const login=async(req,res)=>{
    const {email,password}=req.body;


    try {
        
        //check if email Exists
        const user = await User.findOne({email:email});
        if(!user) return res.status(400).json({message:"User not found"})

        //check if password is correct
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch ) return res.status(400).json({message:"Invalid Password"})

        //genrate Token
        generateToken(user._id,res);

            const userData = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            };

        //send response 
        res.status(200).json({message:"Login Successfull",user:userData})


    } catch (error) {
        console.log("error in login controller",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}

export const getProfile = async(req,res)=>{
    try {
        //get user profile
        const user = await User.findById(req.userData._id).select("-password");
        if(!user) return res.status(404).json({message:"User not found"});
        res.status(200).json({message:"User profile fetched successfully",user:user});
    } catch (error) {
        console.log("error in getProfile controller",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}

export const getOtherProfile=async(req,res)=>{
   
    //check if user is admin or manger
    if(req.userData.role !== "Admin" && req.userData.role !== "Manager") return res.status(403).json({message:"Access Denied"});

    const {userId}=req.query;
    try {
        //get user profile
        const user = await User.findById(userId).select("-password");
        if(!user) return res.status(404).json({message:"User not found"});
        res.status(200).json({message:"User profile fetched successfully",user:user});
} catch (error) {
        console.log("error in getOtherProfile controller",error);
        res.status(500).json({message:"Internal server error"});
        
    }

}


export const getAllUsers = async(req,res)=>{

    //check if user is admin
    if(req.userData.role !== "Admin") return res.status(403).json({message:"Access Denied"});

    try {
        //get all users exluding self
        const users = await User.find({_id:{$ne:req.userData._id}}).select("-password");
        if(!users) return res.status(404).json({message:"No users found"});
        res.status(200).json({message:"Users fetched successfully",users:users});
    } catch (error) {
        console.log("error in getAllUsers controller",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}


export const updateUser = async(req,res)=>{
    //check if user is admin
    if(req.userData.role !== "Admin") return res.status(403).json({message:"Access Denied"});

    const {userId}=req.query;
    const {name,email,role}=req.body;
    try {
        //update user info but password 
        const user = await User.findByIdAndUpdate(userId,{
            name,
            email,
            role
        },{new:true});
        if(!user) return res.status(404).json({message:"User not found"});
        //send user data without password
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.status(200).json({message:"User updated successfully",user:userData});
} catch (error) {
        console.log("error in updateUser controller",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}

export const deleteUser = async(req,res)=>{
    //check if user is admin
    if(req.userData.role !== "Admin") return res.status(403).json({message:"Access Denied"});

    const {userId}=req.query;
    try {
        //delete user
        const user = await User.findByIdAndDelete(userId);
        if(!user) return res.status(404).json({message:"User not found"});
        res.status(200).json({message:"User deleted successfully"});
} catch (error) {
        console.log("error in deleteUser controller",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}