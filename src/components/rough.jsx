import React, { useState } from 'react';
import axios from 'axios';
import { baseUri } from '../baseuri/baseuri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginCard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Default role
  });
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    const { name, email, password, role } = formData;

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (isLogin) {
      // Login validation
      if (!trimmedEmail || !trimmedPassword) {
        notifyError('Email and password are required.');
        return;
      }

      try {
        const response = await axios.post(`${baseUri}/loginUser `, { email: trimmedEmail, password: trimmedPassword });
        notifySuccess("Login Successful!");
      } catch (error) {
        console.error(error);
        notifyError(error.response?.data?.message || "Login Failed!");
      }
    } else {
      // Registration validation
      if (!name || !trimmedEmail || !trimmedPassword) {
        notifyError('All fields are required.');
        return;
      }

      try {
        const response = await axios.post(`${baseUri}/registerUser `, { name, email: trimmedEmail, password: trimmedPassword, role });
        notifySuccess("Registration Successful!");
      } catch (error) {
        console.error(error);
        notifyError(error.response?.data?.message || "Registration Failed!");
      }
    }
  };

  return (
    <div className="border-none h-full w-full flex flex-col items-center gap-6 mx-5 bg-[#1F2937] p-10 rounded sm:h-full sm:w-1/3">
      <h3 className='text-3xl font-bold text-white'>{isLogin ? 'Login' : 'Register'}</h3>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        {!isLogin && (
          <input
            className='p-2 rounded w-full'
            type="text"
            name="name"
            placeholder='Name'
            value={formData.name}
            onChange={handleChange}
          />
        )}
        <input
          className='p-2 rounded w-full'
          type="email"
          name="email"
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className='p-2 rounded w-full'
          type="password"
          name="password"
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
        />
        {!isLogin && (
          <select
            className='p-2 rounded w-full'
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User </option>
            <option value="admin">Admin</option>
          </select>

         
        )}
        {!login}
        <button className='w-40 border-2 border-gray-800 bg-slate-900 p-2 rounded text-gray-300' type="submit">
          {isLogin ? 'Sign in' : 'Register'}
        </button>
      </form>
      <button
        className='mt-4 text-gray-300'
 onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Create an account' : 'Already have an account? Sign in'}
      </button>
      <ToastContainer />
    </div>
  );
};

export default LoginCard;