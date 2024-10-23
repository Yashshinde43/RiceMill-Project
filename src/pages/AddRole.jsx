import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";

const AddRole = () => {
  const [roleData, setRoleData] = useState({
    role_name: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Reset the form
  const resetForm = () => {
    setRoleData({ role_name: "" });
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData({
      ...roleData,
      [name]: value,
    });
  };

  // Base URL for the API
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Handle form submission to create a new role
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.post(
        `${apiBaseUrl}/create-role/`,
        roleData,
        {
          headers: {
            "Authorization": `Bearer ${token}`, // Add JWT token to headers
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Role added successfully");
        resetForm(); // Reset form after a successful response
      } else {
        toast.error("Failed to add role");
      }
    } catch (error) {
      console.error("Error adding role:", error.response || error.message);
  
      // Enhanced error handling
      if (error.response && error.response.data && error.response.data.detail) {
        const errors = error.response.data.detail;
        errors.forEach((errorDetail) => {
          toast.error(`${errorDetail.msg} at ${errorDetail.loc.join(' -> ')}`);
        });
      } else {
        toast.error(error.message || "Error adding role");
      }
    } finally {
      setIsModalOpen(false); // Close the modal after submission
    }
  };
  

  // Handle form submit with confirmation modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the confirmation modal
  };

  // Redirect to login if no token is present
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <SideBar>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add New Role
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label
                  htmlFor="role_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role Name
                </label>
                <input
                  type="text"
                  name="role_name"
                  id="role_name"
                  value={roleData.role_name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Role Name"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Role
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastNotification />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        message="Are you sure you want to submit the form?"
      />
    </SideBar>
  );
};

export default AddRole;
