import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { baseUri } from "../baseuri/baseuri";
import axiosInstance from "../API/axiosInstance.js";
import { useSelector } from "react-redux";

const Home = () => {
 

  const islogin = useSelector((state) => state.auth.islogin);
  const profileName = useSelector((state) => state.auth.user?.name);

  return (
    <div className="min-h-screen w-full bg-gray-100">
      <Header />

      {/* Welcome Message */}
      {islogin && (
  <div className="flex items-center justify-center mt-10">
    <h3 className="text-center text-2xl font-bold text-white bg-gradient-to-r from-green-500 to-green-700 px-6 py-3 rounded-full shadow-lg animate-bounce">
      🎉 Welcome <span className="ml-2 text-yellow-200">{profileName}</span> !!
    </h3>
  </div>
)}


      {/* Authentication Card */}
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to SecureAuth</h2>
          <p className="text-gray-600 mt-2">
            Your security is our priority. Access your account with seamless authentication.
          </p>

          {!islogin && (
            <Link to="/login">
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
                Get Started
              </button>
            </Link>
          )}

          <p className="mt-4 text-gray-500 text-sm">
            Secure your data with multi-layered authentication. Join us today!
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default Home;
