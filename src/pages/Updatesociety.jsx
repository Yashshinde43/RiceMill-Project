import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { toast } from "react-toastify";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";

const UpdateSociety = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [society, setSociety] = useState({
    society_name: "",
    address: "",
    registration_number: "",
    phone_number: "",
    total_members: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch society data
  const fetchSociety = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${apiBaseUrl}/get-societies/${id}`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSociety(response.data);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch society data");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching society data:", error);
      toast.error("Error fetching society data");
      setIsLoading(false);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSociety((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `${apiBaseUrl}/update-society/${id}`,
        society,
        {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Society updated successfully");
        navigate("/show-society");
      } else {
        toast.error("Failed to update society");
      }
    } catch (error) {
      console.error("Error updating society:", error);

      if (error.response) {
        toast.error(
          `Error: ${error.response.data.detail || error.response.statusText}`
        );
      } else if (error.request) {
        toast.error("No response received from the server");
      } else {
        toast.error("Error in setting up the request");
      }
    } finally {
      setIsModalOpen(false); // Close the modal after submission
    }
  };

  // Fetch society data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchSociety();
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
            Update Society
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
                    <label
                      htmlFor="society_name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Society Name
                    </label>
                    <input
                      type="text"
                      name="society_name"
                      id="society_name"
                      value={society.society_name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="google_distance"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Google Distance
                    </label>
                    <input
                      type="text"
                      name="google_distance"
                      id="google_distance"
                      value={society.google_distance}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="actual_distance"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Actual Distance
                    </label>
                    <input
                      type="text"
                      name="actual_distance"
                      id="actual_distance"
                      value={society.actual_distance}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="transporting_rate"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Transporting Rate
                    </label>
                    <input
                      type="text"
                      name="transporting_rate"
                      id="transporting_rate"
                      value={society.transporting_rate}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="distance_from_mill"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Distance From Mill
                    </label>
                    <input
                      type="text"
                      name="distance_from_mill"
                      id="distance_from_mill"
                      value={society.distance_from_mill}
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

export default UpdateSociety;