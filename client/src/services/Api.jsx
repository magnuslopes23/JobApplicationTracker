import axios from "axios";

const API = axios.create({
    baseURL : 'http://44.195.62.53/:5000/api'
});

API.interceptors.request.use((config) =>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
}, (error) =>{
    return Promise.reject(error);
}); 

export default API;
