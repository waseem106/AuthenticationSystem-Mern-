import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  isAuthenticated: !!localStorage.getItem("accessToken"), 
  islogin: !!localStorage.getItem("accessToken"),
  
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
      state.islogin=true;
      localStorage.setItem("accessToken", accessToken); // Store tokens
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user",JSON.stringify(user))    //store user as a string 
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.islogin=false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    },
    
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
