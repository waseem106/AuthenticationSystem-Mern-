
import { baseUri } from "../baseuri/baseuri";
import axiosInstance from "./axiosInstance.js";


const getAllUsers=async()=>{
    try {
        const response = await axiosInstance.post("/getAllUsers"); 
        console.log("Users:", response.data);
        return response.data;
        
    } catch (error) {
        console.error("Error fetching users:", error.response?.data || error.message);
    }
}


const deleteUser=async(userId)=>{
    try {
        console.log("Deleting User",userId)
        const response=await axiosInstance.delete(`${baseUri}/deleteUser/${userId}`)
        
        console.log("User deleted ",response.data)
        return response.data
    } catch (error) {
        console.error("Error while deleting User",error.response.data || error.message)
    }
}
const updateUser = async (userId, userData) => {
    console.log("user data from modal", userData);
  
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
  
    // If profilePicture is a file, append it to FormData
    if (userData.profilePicture instanceof File) {
      formData.append("profilePicture", userData.profilePicture);
    } else if (typeof userData.profilePicture === "string") {
      // If it's a URL, append it as a string
      formData.append("profilePicture", userData.profilePicture);
    }
  
    try {
      const response = await axiosInstance.post(`${baseUri}/updateUser/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for file upload
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error while updating user", error.response?.data || error.message);
      throw error; // Throw the error to handle it in the component
    }
  };

export {getAllUsers,deleteUser,updateUser}