 import React, { use, useState } from "react";
import axios from "axios";
import { baseUri } from "../baseuri/baseuri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/authSlice";

const LoginCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    image: null,
  });
  const [login, setIsLogin] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] })); 
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    console.log("formData", formData); 
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role, image } = formData;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      notifyError("Email and Password are required");
      return;
    }

    if (login) {
      
      try {
        const response = await axios.post(`${baseUri}/loginUser `, {
          email: trimmedEmail,
          password: trimmedPassword,
        });
        dispatch(setCredentials(response.data))
        console.log("data while login",response.data.user)
        navigate('/');
        notifySuccess("Login Successful!");
        
      } catch (error) {
        console.error(error);
        notifyError(error.response?.data?.message || "Login Failed!");
      }
    } else {
      
      const formDataToSend = new FormData();
      formDataToSend.append("name", name);
      formDataToSend.append("email", trimmedEmail);
      formDataToSend.append("password", trimmedPassword);
      formDataToSend.append("role", role);
      if (image) {
        formDataToSend.append("image", image); 
      }

      try {
        const response = await axios.post(`${baseUri}/registerUser `, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        notifySuccess(`User  Registered Successfully: ${response.data.message}`);
      } catch (error) {
        console.log(error);
        notifyError("Failed to register user");
      }
    }
  };

  return (
    <div className="border-none h-full w-full flex flex-col items-center gap-6 mx-5 bg-[#1F2937] p-10 rounded sm:h-full sm:w-1/3">
      <h3 className="text-3xl font-bold text-white">{login ? "Login" : "Register"}</h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        {!login && (
          <input
            className="p-2 rounded w-full"
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <input
          className="p-2 rounded w-full"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="p-2 rounded w-full"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {!login && (
          <select
            name="role"
            className="p-2 rounded w-full"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User </option>
            <option value="admin">Admin</option>
          </select>
        )}

        {!login && (
          <input
            type="file"
            name="image"
            className="p-2 rounded w -full"
            onChange={handleChange} // Ensure this line is included
          />
        )}

        <button
          className="w-40 border-2 border-gray-800 bg-slate-900 p-2 rounded text-gray-300"
          type="submit"
        >
          {!login ? "Register" : "Login"}
        </button>
      </form>

      <button onClick={() => setIsLogin(!login)} className="text-white">
        {login ? "Create an account" : "Already have an account? Sign in"}
      </button>
    </div>
  );
};

export default LoginCard;