import axios from 'axios';

export const axiosInstance =axios.create({
    baseURL:"http://localhost:9054/api",
    withCredentials:true,
});