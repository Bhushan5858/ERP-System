import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import User from '../Models/UserModel.js';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const generateToken = (user_id,res)=>{
    const token = jwt.sign({user_id},JWT_SECRET_KEY,{
        expiresIn:"1d"
    })

    //sending the token to cookies
    res.cookie("JWT",token,{
        httpOnly:true,  // only accessible by the web server it prevents (XSS`) client side JS from accessing the cookie
        sameSite:"none", // helps to prevent CSRF attacks means that the cookie will only be sent in a first-party context (i.e., if the site is the same as the one that set the cookie)
        maxAge:24*60*60*1000 // 1 day
    
    })
}


//Middleware to verify JWT token
export const verifyToken = async(req,res,next)=>{

    try {
        const token = req.cookies.JWT;
        if(!token) return res.status(401).json({message:"Unauthorized"});

        //verify the token
        const decoded = jwt.verify(token,process.env.JWT_SECRETE_KEY);

        //find User By ID
        const user = await User.findOne({_id:decoded.user_id}).select("-password");
        if(!user) return res.status(401).json({message:"Unauthorized"});

        console.log("in jwt file",user);
        req.userData=user;
        next();
        
    } catch (error) {
        console.log("error in jwt verification",error);
        res.status(500).json({message:"Internal server error"});
        
    }
}