import axios from "axios";
import { baseUri } from "../baseuri/baseuri";

const axiosInstance = axios.create({
  baseURL: baseUri
});

axiosInstance.interceptors.request.use(
    async (config) => {
      let token = localStorage.getItem("accessToken");
      config.headers.Authorization = token ? `Bearer ${token}` : "";
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          const response = await axios.post(`${baseUri}//refresh-token`, { refreshToken });
  
          localStorage.setItem("accessToken", response.data.accessToken);
          error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
  
          return axiosInstance(error.config); 
        } catch (err) {
          console.error("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;