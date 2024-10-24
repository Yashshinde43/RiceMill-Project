import { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Ensure you store and retrieve the user ID

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get(`${apiBaseUrl}/users/${userId}`, {
  //         headers: {
  //           "api-key": apiKey,
  //         },
  //       });
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   if (userId) {
  //     fetchUserData();
  //   }
  // }, [userId]);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  if (!userData)
    return (
      <SideBar>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <p className="text-gray-600">Loading...</p>
        </div>
      </SideBar>
    );

  return (
    <SideBar>
      <div className="flex items-center justify-center min-h-screen  py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-indigo-600 px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
          </div>
          <div className="px-4 py-5 sm:px-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium text-gray-900">
                  User Information
                </h2>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">Name:</p>
                  <p className="text-lg text-gray-900">{userData.name}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">Email:</p>
                  <p className="text-lg text-gray-900">{userData.email}</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">Role:</p>
                  <p className="text-lg text-gray-900">{userData.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default UserDashboard;
