import {create} from 'zustand';
import {axiosInstance} from '../Axios/Axios.js';
import toast  from 'react-hot-toast';

export const useAuthUserStore=create((set,get)=>({
    authUser:JSON.parse(localStorage.getItem('authUser')) || null,
    login:async(formData)=>{

        if(!formData) return false;

        console.log("form data",formData)

        try {
            
            const response =await axiosInstance.post('/user/login',formData);

            if(response.status === 200){
                console.log(response.data)
                toast.success("login successful");
                set({authUser:response.data.userData})
                localStorage.setItem('authUser',JSON.stringify(response.data.userData));
                return true;
            }
            else if(response.status === 400){
                toast.error("Invalid credentials");
                return false
            }
        
        } catch (error) {
            console.error("Login Error:", error);
            return false;
        }
    }
}))