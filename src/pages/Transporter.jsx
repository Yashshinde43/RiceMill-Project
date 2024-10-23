import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal"; // Import the confirmation modal

const Add_New_Transporter = () => {
  const [transporterData, setTransporterData] = useState({
    transporter_name: "",
    transporter_phone_number: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const initialData = {
    transporter_name: "",
    transporter_phone_number: "",
  };

  const resetForm = () => {
    setTransporterData(initialData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransporterData({
      ...transporterData,
      [name]: value,
    });
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiBaseUrl}/add-transporter/`,
        transporterData,
        {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Transporter added successfully");
        resetForm();
      } else if (response.status === 400) {
        const errorResponse = await response.json();
        toast.error(errorResponse.detail);
      } else {
        toast.error("Failed to add rice mill");
      }
    } catch (error) {
      toast.error("Error adding rice mill");
    }
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the confirmation modal
  };

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
            Add New Transporter
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <Inputbox
                label="Transporter Name"
                name="transporter_name"
                placeholder="Enter transporter name"
                type="text"
                value={transporterData.transporter_name}
                onChange={handleInputChange}
              />
              <Inputbox
                label="Transporter Phone Number"
                name="transporter_phone_number"
                placeholder="Enter transporter phone number"
                pattern="[0-9]{10}"
                type="text"
                value={transporterData.transporter_phone_number}
                onChange={handleInputChange}
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Transporter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit} // Confirm the submission
        message="Are you sure you want to submit the form?"
      />
    </SideBar>
  );
};

export default Add_New_Transporter;
