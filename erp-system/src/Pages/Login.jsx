import React, { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast'
import { MessageSquare, Mail, Lock, EyeOff, Eye } from 'lucide-react';
import LOGO from '../assets/Logo.png';
import { useAuthUserStore } from '../Store/AuthUserStore';
import { useNavigate } from 'react-router-dom';


const Login = () => {
   const navigate =useNavigate();
  const {login,authUser}=useAuthUserStore();
  
  useEffect(()=>{
    if(authUser){
      navigate('/home');
    }
  } ,[authUser,navigate]);
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    if (!formData.email.trim()) {
        toast.error("Email is required");
        return false}

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error("Invalid email");
        return false; }

    if (!formData.password.trim()) {
        toast.error("Password is required");
        return false
    }
    if (formData.password.length < 6){ 
    toast.error("Password must be at least 6 characters");
    return false;
}

return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData);
      toast.success("Login successful");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center group">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
             <img src={LOGO} alt="Logo" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">Welcome Back!</h1>
            <p className="text-gray-500 text-sm">Get back to work</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Email</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="email"
                className="input input-bordered w-full pl-10 text-sm"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium text-gray-700">Password</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 text-sm"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn bg-indigo-600 hover:bg-indigo-700 text-white w-full">
                Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
