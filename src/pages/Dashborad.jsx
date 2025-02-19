import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axiosInstance from "../API/axiosInstance";
import { baseUri } from "../baseuri/baseuri";
import { deleteUser, updateUser } from "../API/protectedApi";
import { toast } from "react-toastify";
import EditUserModal from "../components/modals/EditUserModal.jsx"; // Import the modal

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedUser, setSelectedUser] = useState(null); 

  
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  
  const handleSaveUser = async (updatedUserData) => {
    try {
      const response = await updateUser(selectedUser._id, updatedUserData);
      if (response) {
        
        setUsers(users.map((user) =>
          user._id === selectedUser._id ? { ...user, ...updatedUserData } : user
        ));
        toast.success("User updated successfully!");
        setIsModalOpen(false); 
      }
    } catch (error) {
      toast.error("Error updating user!");
    }
  };

  // Delete user
  const handleDelete = async (userId) => {
    const response = await deleteUser(userId);
    if (response) {
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully!");
    } else {
      toast.error("Error deleting user!");
    }
  };

  // Confirm delete action
  const confirmDelete = (userId) => {
    toast(
      ({ closeToast }) => (
        <div className="p-4">
          <p className="text-gray-800 mb-4">
            Are you sure you want to delete this user?
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => {
                handleDelete(userId);
                closeToast();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Yes
            </button>
            <button
              onClick={closeToast}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false, position: "top-center" }
    );
  };

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.post(`${baseUri}/getAllUsers`);
        console.log("Data:", response.data);
        if (response.data && response.data.allUsers) {
          setUsers(response.data.allUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <div className="mt-10 p-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6 relative">
          <span className="relative z-10">Registered Users</span>
          <span className="absolute left-1/2 bottom-0 w-[30%] h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform -translate-x-1/2"></span>
        </h2>
        <ul className="flex flex-col items-center gap-6">
          {users.map((user) => (
            <li
              key={user._id}
              className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md p-4 rounded-lg w-full max-w-2xl"
            >
              <div className="flex items-center gap-4">
                <img
                  src={user.profilePicture}
                  className="w-14 h-14 rounded-full"
                  alt={user.name}
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    Name: {user.name}
                  </p>
                  <p className="text-gray-600">Email: {user.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="w-24 mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                  onClick={() => handleEditUser(user)} // Pass the user object
                >
                  Edit
                </button>
                <button
                  className="w-24 mt-4 sm:mt-0 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                  onClick={() => confirmDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Render the modal if isModalOpen is true */}
      {isModalOpen && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default Dashboard;