import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast
import SelectInput from "../inputelement/Selectinput";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal"; // Import ConfirmationModal
import ToastNotification from "../components/ToastNotification"; // Import ToastNotification component

const Kochia = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [kochiaData, setKochiaData] = useState({
    rice_mill_name_id: "",
    kochia_name: "",
    kochia_phone_number: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [millOptions, setMillOptions] = useState([]);

  const initialData = {
    rice_mill_name_id: "",
    kochia_name: "",
    kochia_phone_number: "",
  };

  const resetForm = () => {
    setKochiaData(initialData);
  };

  // Fetch data for the "Select Rice Mill" dropdown
  useEffect(() => {
    async function fetchMillData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${apiBaseUrl}/get-all-rice-mills`, {
          headers: {
            "api-key": apiKey,
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = response.data;
        setMillOptions(data);
      } catch (error) {
        toast.error("Error fetching rice mills");
      }
    }
    fetchMillData();
  }, [apiBaseUrl, apiKey]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKochiaData({
      ...kochiaData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${apiBaseUrl}/add-kochia`,
        kochiaData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 201 && response.status < 300) {
        toast.success("Kochia added successfully");
        resetForm();
      } else {
        toast.error("Failed to add Kochia");
      }
    } catch (error) {
      toast.error(`Error adding Kochia: ${error.message}`);
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
            Add New Kochia
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <SelectInput
                label="Select Rice Mill"
                name="rice_mill_name_id"
                options={millOptions.map((option) => ({
                  label: option.rice_mill_name,
                  value: option.rice_mill_id,
                }))}
                value={
                  kochiaData.rice_mill_name_id
                    ? {
                        label: millOptions.find(
                          (option) => option.rice_mill_id === kochiaData.rice_mill_name_id
                        )?.rice_mill_name,
                        value: kochiaData.rice_mill_name_id,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "rice_mill_name_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Mill"
              />
              <Inputbox
                name="kochia_name"
                label="Kochia Name"
                placeholder="Enter Kochia Name"
                value={kochiaData.kochia_name}
                onChange={handleInputChange}
                type="text"
              />
              <Inputbox
                name="kochia_phone_number"
                label="Kochia Phone Number"
                placeholder="Enter Phone Number"
                value={kochiaData.kochia_phone_number}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                type="tel"
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Kochia
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastNotification /> {/* Include the ToastNotification component */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        message="Are you sure you want to submit the form?"
      />
    </SideBar>
  );
};

export default Kochia;
