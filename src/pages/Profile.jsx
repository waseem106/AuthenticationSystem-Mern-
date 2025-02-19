import React from 'react';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4 flex flex-col items-center">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <div className="flex justify-center mb-4">
            <img
              src={user?.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800">{user?.name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
