import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import { useNavigate } from "react-router-dom";


const AddNewSociety = () => {
  const [societyData, setSocietyData] = useState({
    society_name: "",
    distance_from_mill: 0,
    google_distance: 0,
    actual_distance: 0,
    transporting_rate: 0,
  });

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialData = {
    society_name: "",
    distance_from_mill: 0,
    google_distance: 0,
    actual_distance: 0,
    transporting_rate: 0,
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const resetForm = () => {
    setSocietyData(initialData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocietyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${apiBaseUrl}/add-society/`,
        societyData,
        {
          headers: {
            "api-key": apiKey,
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast.success("Society added successfully");
        resetForm();
      } else if (response.status === 400) {
        const errorResponse = await response.json();
        toast.error(errorResponse.detail);
      } else {
        toast.error("Failed to add Society");
        // console.log(response.status)
      }
    } catch (error) {
      toast.error("Error adding Society");
    }
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the confirmation modal
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
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
            Add New Society
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <Inputbox
                label="Society Name"
                name="society_name"
                placeholder="Enter society name"
                value={societyData.society_name}
                onChange={handleInputChange}
                type="text"
                required
              />
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Google Distance"
                  name="google_distance"
                  placeholder="Enter Google distance"
                  type="number"
                  value={societyData.google_distance}
                  onChange={handleInputChange}
                  required
                />
                <Inputbox
                  label="Actual Distance"
                  name="actual_distance"
                  type="number"
                  placeholder="Enter actual distance"
                  value={societyData.actual_distance}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Inputbox
                label="Transporting Rate"
                name="transporting_rate"
                placeholder="Enter transporting rate"
                type="number"
                value={societyData.transporting_rate}
                onChange={handleInputChange}
                required
              />
              <Inputbox
                label="Distance From Mill"
                name="distance_from_mill"
                placeholder="Enter distance from mill"
                type="number"
                value={societyData.distance_from_mill}
                onChange={handleInputChange}
                required
              />
              <div>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Society
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleSubmit} message="Are you sure you want to submit?" />
    </SideBar>
  );
};

export default AddNewSociety;
