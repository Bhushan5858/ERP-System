import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    EID:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Admin", "Manager","Developer"],
        default: "employee"
    },
},
{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;