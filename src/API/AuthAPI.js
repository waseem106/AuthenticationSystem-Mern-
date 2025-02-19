import axiosInstance from "./axiosInstance";
import { baseUri } from "../baseuri/baseuri";
import { useDispatch } from "react-redux";



const logoutUser = async (dispatch) => {
  try {
    const response = await axiosInstance.post(`${baseUri}/logout`);
    if (response.status === 200) {
      
      console.log("User logged out successfully");  
      
    } else {
      console.log("Failed to log out user");
    }
  } catch (error) {
    console.error("Logout  error:", error);
  }
};

export default logoutUser;
