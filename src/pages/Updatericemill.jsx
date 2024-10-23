import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";

const UpdateRiceMill = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [riceMill, setRiceMill] = useState({
    gst_number: "",
    rice_mill_name: "",
    mill_address: "",
    phone_number: "",
    rice_mill_capacity: ""
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch rice mill data
  const fetchRiceMill = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiBaseUrl}/get-rice-mill/${id}`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setRiceMill(response.data);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch rice mill data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching rice mill data:", error);
      toast.error("Error fetching rice mill data");
      setIsLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRiceMill((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.put(`${apiBaseUrl}/update-rice-mill/${id}`, riceMill, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Rice mill updated successfully");
        navigate("/show-rice-mill-data");
      } else {
        toast.error("Failed to update rice mill");
      }
    } catch (error) {
      console.error("Error updating rice mill:", error);

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

  // Fetch rice mill data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchRiceMill();
  }, [id, navigate]);

  // Handle form submit with confirmation modal
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the confirmation modal
  };

  return (
    <SideBar>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Rice Mill
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10">
            {isLoading ? (
              <p className="text-center text-indigo-600">Loading...</p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="gst_number" className="block text-sm font-medium text-gray-700">
                      GST Number
                    </label>
                    <input
                      type="text"
                      name="gst_number"
                      id="gst_number"
                      value={riceMill.gst_number}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="rice_mill_name" className="block text-sm font-medium text-gray-700">
                      Rice Mill Name
                    </label>
                    <input
                      type="text"
                      name="rice_mill_name"
                      id="rice_mill_name"
                      value={riceMill.rice_mill_name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="mill_address" className="block text-sm font-medium text-gray-700">
                      Mill Address
                    </label>
                    <input
                      type="text"
                      name="mill_address"
                      id="mill_address"
                      value={riceMill.mill_address}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      id="phone_number"
                      value={riceMill.phone_number}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="rice_mill_capacity" className="block text-sm font-medium text-gray-700">
                      Rice Mill Capacity
                    </label>
                    <input
                      type="text"
                      name="rice_mill_capacity"
                      id="rice_mill_capacity"
                      value={riceMill.rice_mill_capacity}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update
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

export default UpdateRiceMill;
