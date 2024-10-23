import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification"; // Import the new ToastNotification component

const Add_Warehouse = () => {
  const [warehouseData, setWarehouseData] = useState({
    ware_house_name: "",
    ware_house_transporting_rate: null,
    hamalirate: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const navigate = useNavigate();

  const initialData = {
    ware_house_name: "",
    ware_house_transporting_rate: null,
    hamalirate: null,
  };

  const resetForm = () => {
    setWarehouseData(initialData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWarehouseData({
      ...warehouseData,
      [name]: value,
    });
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${apiBaseUrl}/ware-house-transporting/`,
        warehouseData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            "Authorization": `Bearer ${token}`,

          },
        }
      );

      if (response.status >= 201 && response.status < 300) {
        toast.success("Warehouse added successfully");
        resetForm();
      } else {
        toast.error("Failed to add Warehouse");
      }
    } catch (error) {
      toast.error("Error adding Warehouse");
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
            Add Warehouse
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <Inputbox
                label="Warehouse Name"
                name="ware_house_name"
                placeholder="Enter Warehouse Name"
                value={warehouseData.ware_house_name}
                onChange={handleInputChange}
                type="text"
              />
              <Inputbox
                label="Warehouse Transporting Rate"
                name="ware_house_transporting_rate"
                placeholder="Enter Transporting Rate"
                type="number"
                value={warehouseData.ware_house_transporting_rate}
                onChange={handleInputChange}
              />
              <Inputbox
                label="Hamali Rate"
                name="hamalirate"
                placeholder="Enter Hamali Rate"
                value={warehouseData.hamalirate}
                onChange={handleInputChange}
                type="number"
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Warehouse
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

export default Add_Warehouse;
