import React from "react";
import {  useSelector } from "react-redux";
import { Navigate } from "react-router-dom";




export const ProtectedRoute=({children})=>{
    const {islogin}=useSelector((state)=>state.auth);
    if(!islogin)
    {
        return <Navigate to="/login" replace/>
    }
    return children

}



export const AdminRoute = ({ children }) => {
    const { islogin, user } = useSelector((state) => state.auth);
    
    if (!islogin) {
      return <Navigate to="/login" replace />;
    }
    
    if (user.role !== 'admin') {
      // Redirect non-admin users to home (or any other page)
      return <Navigate to="/" replace />;
    }
    
    return children;
  };