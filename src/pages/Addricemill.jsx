import React, { useEffect, useState } from "react";
import { toast } from "react-toastify"; // Import toast
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification"; // Import the new ToastNotification component

const Addricemill = () => {
  const [Addricedata, setAddricedata] = useState({
    gst_number: "",
    rice_mill_name: "",
    mill_address: "",
    phone_number: "",
    rice_mill_capacity: 0,
  });

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const navigate = useNavigate();

  const initialData = {
    gst_number: "",
    rice_mill_name: "",
    mill_address: "",
    phone_number: "",
    rice_mill_capacity: 0,
  };

  const resetForm = () => {
    setAddricedata(initialData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddricedata({
      ...Addricedata,
      [name]: value,
    });
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const validateGST = (gstNumber) => {
    const gstPattern =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gstPattern.test(gstNumber);
  };

  const handleSubmit = async () => {
    if (!validateGST(Addricedata.gst_number)) {
      toast.error("Invalid GST Number. Please enter a valid GST Number");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiBaseUrl}/add-rice-mill/`,
        Addricedata,
        {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Rice mill added successfully");
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

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/login');
  //   }
  // }, [navigate]);

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
            Add New Rice Mill
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <Inputbox
                label="Rice Mill"
                name="rice_mill_name"
                value={Addricedata.rice_mill_name}
                type="text"
                placeholder="Enter Rice Mill Name"
                onChange={handleInputChange}
              />
              <Inputbox
                label="GST Number"
                name="gst_number"
                value={Addricedata.gst_number}
                type="text"
                placeholder="Enter GST Number"
                onChange={handleInputChange}
              />
              <Inputbox
                label="Mill Address"
                name="mill_address"
                placeholder="Enter Mill Address"
                type="text"
                value={Addricedata.mill_address}
                onChange={handleInputChange}
              />
              <Inputbox
                label="Phone number"
                name="phone_number"
                value={Addricedata.phone_number}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Phone Number"
                pattern="[0-9]{10}"
              />
              <Inputbox
                label="Rice Mill Capacity"
                name="rice_mill_capacity"
                value={Addricedata.rice_mill_capacity || ""} // Ensures no '0' is shown, defaults to an empty string
                type="number"
                onChange={handleInputChange}
                placeholder="Enter Rice Mill Capacity"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Rice Mill
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

export default Addricemill;
