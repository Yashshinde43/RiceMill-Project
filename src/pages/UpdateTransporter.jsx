import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";

const UpdateTransporter = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [transporterData, setTransporterData] = useState({
    transporter_name: "",
    transporter_phone_number: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch transporter data
  const fetchTransporter = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiBaseUrl}/get-transporter/${id}`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setTransporterData(response.data);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch transporter data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching transporter data:", error);
      toast.error("Error fetching transporter data");
      setIsLoading(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransporterData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.put(`${apiBaseUrl}/update-transporter/${id}`, transporterData, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Transporter updated successfully");
        navigate("/show-transporter-data");
      } else {
        toast.error("Failed to update transporter");
      }
    } catch (error) {
      console.error("Error updating transporter:", error);

      if (error.response) {
        toast.error(`Error: ${error.response.data.detail || error.response.statusText}`);
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("Error in setting up the request");
      }
    } finally {
      setIsModalOpen(false); // Close the modal after submission
    }
  };

  // Fetch transporter data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTransporter();
  }, [id, navigate]);

  // Handle form submit with confirmation modal
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
            Update Transporter
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            {isLoading ? (
              <p className="text-center text-indigo-600">Loading...</p>
            ) : (
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <div>
                  <label htmlFor="transporter_name" className="block text-sm font-medium text-gray-700">
                    Transporter Name
                  </label>
                  <input
                    type="text"
                    name="transporter_name"
                    id="transporter_name"
                    value={transporterData.transporter_name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label htmlFor="transporter_phone_number" className="block text-sm font-medium text-gray-700">
                    Transporter Phone Number
                  </label>
                  <input
                    type="text"
                    name="transporter_phone_number"
                    id="transporter_phone_number"
                    value={transporterData.transporter_phone_number}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update Transporter
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastNotification /> {/* Include the ToastNotification component */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit} // Confirm handler triggers form submission
        message="Are you sure you want to submit the form?"
      />
    </SideBar>
  );
};

export default UpdateTransporter;
