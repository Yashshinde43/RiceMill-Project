import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import { toast } from "react-toastify";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal"; // Import confirmation modal
import ToastNotification from "../components/ToastNotification"; // Import toast notification component

const AddParty = () => {
  const [partyData, setPartyData] = useState({
    party_name: "",
    party_phone_number: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const navigate = useNavigate();

  const initialData = {
    party_name: "",
    party_phone_number: "",
  };

  const resetForm = () => {
    setPartyData(initialData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartyData({
      ...partyData,
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
    if (!validatePhoneNumber(partyData.party_phone_number)) {
      toast.error("Invalid Phone Number. Please enter a 10-digit number.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiBaseUrl}/add-party/`,
        partyData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Party added successfully");
        resetForm();
      } else {
        toast.error("Failed to add party");
      }
    } catch (error) {
      toast.error(`Error adding party: ${error.message}`);
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
            Add New Party
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <Inputbox
                label="Party Name"
                name="party_name"
                value={partyData.party_name}
                type="text"
                placeholder="Enter Party Name"
                onChange={handleInputChange}
              />
              <Inputbox
                label="Phone Number"
                name="party_phone_number"
                value={partyData.party_phone_number}
                type="text"
                placeholder="Enter 10-digit Phone Number"
                onChange={handleInputChange}
                pattern="[0-9]{10}"
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Party
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastNotification /> {/* Include toast notifications */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        message="Are you sure you want to submit the form?"
      />
    </SideBar>
  );
};

export default AddParty;
