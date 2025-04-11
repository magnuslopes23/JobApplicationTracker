import React, {createContext, useContext, useEffect, useState} from "react";
import API from '../services/Api';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) =>{

    const [user, setUser] = useState();
    const [token, setToken] = useState(localStorage.getItem('token') || null)

    useEffect(()=>{
        const fetchUser = async () =>{
            if(token){
                try{
                    const res = await API.get('/auth/me');
                    setUser(res.data);
                }catch (err){
                    console.log(err);
                }
            }
        }
        fetchUser();
    },[token]);

    const registerUser = async (userData) =>{
        const res = await API.post('/auth/register', userData);
        const {token, user} = res.data;
        localStorage.setItem('token', token);
        setUser(user);
        setToken(token);
    }

    const login = async ({email, password}) =>{
        const res = await API.post('/auth/login', {email, password});
        const {token, user} = res.data;
        localStorage.setItem('token', token);
        setUser(user);
        setToken(token);
    }

    const logout = () =>{
        localStorage.removeItem('token')
        setToken(null);
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, token, registerUser, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}