import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Inputbox from "../inputelement/Inputbox"; // Assuming you have this input component
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar"; // Assuming you are using this layout component
import ConfirmationModal from "../components/ConfirmationModal"; // Modal for confirmation

const Add_Broker = () => {
  const [brokerData, setBrokerData] = useState({
    broker_name: "",
    broker_phone_number: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const initialData = {
    broker_name: "",
    broker_phone_number: "",
  };

  const resetForm = () => {
    setBrokerData(initialData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrokerData({
      ...brokerData,
      [name]: value,
    });
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phoneNumber);
  };

  const handleSubmit = async () => {
    if (!validatePhoneNumber(brokerData.broker_phone_number)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiBaseUrl}/add-broker/`,
        brokerData,
        {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status < 300) {
        toast.success("Broker added successfully");
        resetForm();
      } else {
        toast.error("Failed to add broker");
      }
    } catch (error) {
      toast.error(`Error adding broker: ${error.message}`);
    }
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the confirmation modal
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <SideBar>
      <div className="w-full flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add New Broker
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <Inputbox
                label="Broker Name"
                name="broker_name"
                value={brokerData.broker_name}
                onChange={handleInputChange}
                placeholder="Enter Broker Name"
                required={true}
              />
              <Inputbox
                label="Phone Number"
                name="broker_phone_number"
                value={brokerData.broker_phone_number}
                onChange={handleInputChange}
                placeholder="Enter 10-digit Phone Number"
                required={true}
                pattern="[0-9]{10}"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Broker
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
        onConfirm={handleSubmit}
        message="Are you sure you want to submit the form?"
      />
    </SideBar>
  );
};

export default Add_Broker;
