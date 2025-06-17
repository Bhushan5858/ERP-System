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



export const getAllUsers = async (req, res) => {
    if (req.userData.role !== "Admin" && req.userData.role !== "Manager") {
        return res.status(403).json({ message: "Access Denied" });
    }
   //get all users like developer and manager without password
   try{
    const users = await User.find({ role: { $in: ["Developer", "Manager"] } }).select("-password");
    if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
}catch (error) {
    console.log("Error in getting users", error);
    res.status(500).json({ message: "Internal server error" });
}
}



export const updateUser = async (req, res) => {
    const { userId, EID, name, email, password, role } = req.body;

    // Check if the logged-in user is an Admin
    if (req.userData.role !== "Admin") {
        return res.status(403).json({ message: "Access Denied" });
    }

    // Prevent admin from updating their own data
    if (req.userData._id === userId) {
        return res.status(403).json({ message: "You cannot update your own data" });
    }

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update user data
        user.EID = EID || user.EID;
        user.name = name || user.name;
        user.email = email || user.email;
        user.role = role || user.role;

        // Only update password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10); // <-- Hash password!
            user.password = hashedPassword;
        }

        await user.save();

        return res.status(200).json({ message: "User updated successfully" });

    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUser = async (req, res) => {
    const { userId } = req.query;

     // Check if the logged-in user is an Admin
     if (req.userData.role !== "Admin") {
        return res.status(403).json({ message: "Access Denied" });
    }

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



export const getProfile=async(req,res)=>{
const userId =req.userData._id;
console.log(userId);
try {

    const user = await User.findById(userId).select("-password");

    if(!user) res.status(404).json({message:"user Not Found"});

    res.status(200).json({user})

} catch (error) {
    console.error("Error getting profile", error);
    return res.status(500).json({ message: "Internal server error" });
}

}


export const logout = async (req, res) => {
    //clear the cookie
    res.clearCookie("JWT");
    res.status(200).json({ message: "Logout successful" });
}
