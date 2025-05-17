import { generateToken } from "../Middleware/JWT.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";


export const login = async (req, res) => {
    const { email, password } = req.body;
    //check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    //check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    //generate token
     generateToken(user._id, res);
    
    //send the user data without password
    const userData = {
        _id: user._id,
        EID: user.EID,
        name: user.name,
        email: user.email,
        role: user.role
    }
    res.status(200).json({ message: "Login successful", userData });
}

export const addUser = async (req, res) => {
    //check if the user is admin
    if (req.userData.role !== "Admin") {
        return res.status(403).json({ message: "Access Denied" });
    }
    const { EID, name, email, password, role } = req.body;
    //check if the user already exists
    const userExists = await User.findOne({ EID });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    //check if the email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        return res.status(400).json({ message: "Email already exists" });
    }
    //hash the password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user
    const user = new User({
        EID,
        name,
        email,
        password: hashedPassword,
        role
    });
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Error in creating user", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const logout = async (req, res) => {
    //clear the cookie
    res.clearCookie("JWT");
    res.status(200).json({ message: "Logout successful" });
}
