import React,{createContext,useContext,useEffect,useState} from "react";
import {api} from "../services/api";
const AuthContext=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("farmdirect-user"))||null}catch{return null}});const [loading,setLoading]=useState(false);useEffect(()=>{if(user)localStorage.setItem("farmdirect-user",JSON.stringify(user));else localStorage.removeItem("farmdirect-user")},[user]);
const login=async(email,password)=>{setLoading(true);try{const data=await api.login(email,password);localStorage.setItem("farmdirect-token",data.token);setUser(data.user);return data.user}finally{setLoading(false)}};
const register=async(payload)=>{setLoading(true);try{const data=await api.register(payload);localStorage.setItem("farmdirect-token",data.token);setUser(data.user);return data.user}finally{setLoading(false)}};
const logout=()=>{localStorage.removeItem("farmdirect-token");setUser(null)};return <AuthContext.Provider value={{user,loading,login,register,logout}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);
