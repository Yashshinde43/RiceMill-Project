import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import SideBar from "../components/Sidebar";
import SelectInput from "../inputelement/Selectinput";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";
import { useNavigate, useParams } from "react-router-dom";


const UpdateOtherawak = () => {
    const { id } = useParams();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [otherawakData, setOtherawakData] = useState({
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    truck_number_id: "",
    material: "",
    nos: 0,
    reason: "",
    weight: 0,
    bill_amount: 0,
  });

  const [allData, setAllData] = useState([]); // Holds data for party, mill names, trucks, etc.
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for confirmation modal

  // Fetch related data on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // Redirect to login if token is missing
          return;
        }

        const response = await axios.get(
          `${apiBaseUrl}/other-awak-data/${id}`,
          {
            headers: {
              "api-key": apiKey,
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllData(response.data);
        console.log(response.data)

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
        setIsLoading(false);
      }
    }
    fetchData();
  }, [apiBaseUrl, apiKey, id]);

  // Reset form
  const resetForm = () => {
    setOtherawakData({
      rst_number: 0,
      date: "",
      party_id: "",
      rice_mill_name_id: "",
      truck_number_id: "",
      material: "",
      nos: 0,
      reason: "",
      weight: 0,
      bill_amount: 0,
    });
  };

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOtherawakData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit form data
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Redirect to login if token is missing
        return;
      }

      const response = await axios.put(
        `${apiBaseUrl}/update-other-awak-data/${otherawakData.other_awak_id}`,
        otherawakData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Other Awak updated successfully");
        resetForm(); // Reset form after successful submission
      } else {
        toast.error("Failed to update Other Awak");
      }
    } catch (error) {
      console.error("Error updating Other Awak:", error);
      toast.error("Error in updating Other Awak");
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open confirmation modal before submission
  };

  return (
    <SideBar>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Update Other Awak
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
                    <label htmlFor="rst_number" className="block text-sm font-medium text-gray-700">
                      RST Number
                    </label>
                    <input
                      type="number"
                      name="rst_number"
                      id="rst_number"
                      value={otherawakData.rst_number}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      id="date"
                      value={otherawakData.date}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="party_id" className="block text-sm font-medium text-gray-700">
                      Party
                    </label>
                    <SelectInput
                      name="party_id"
                      value={otherawakData.party_id}
                      onChange={handleInputChange}
                      options={allData.parties || []}
                    />
                  </div>
                  <div>
                    <label htmlFor="rice_mill_name_id" className="block text-sm font-medium text-gray-700">
                      Rice Mill Name
                    </label>
                    <SelectInput
                      name="rice_mill_name_id"
                      value={otherawakData.rice_mill_name_id}
                      onChange={handleInputChange}
                      options={allData.riceMills || []}
                    />
                  </div>
                  <div>
                    <label htmlFor="truck_number_id" className="block text-sm font-medium text-gray-700">
                      Truck Number
                    </label>
                    <SelectInput
                      name="truck_number_id"
                      value={otherawakData.truck_number_id}
                      onChange={handleInputChange}
                      options={allData.trucks || []}
                    />
                  </div>
                  <div>
                    <label htmlFor="material" className="block text-sm font-medium text-gray-700">
                      Material
                    </label>
                    <input
                      type="text"
                      name="material"
                      id="material"
                      value={otherawakData.material}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="nos" className="block text-sm font-medium text-gray-700">
                      Nos
                    </label>
                    <input
                      type="number"
                      name="nos"
                      id="nos"
                      value={otherawakData.nos}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight
                    </label>
                    <input
                      type="number"
                      name="weight"
                      id="weight"
                      value={otherawakData.weight}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="bill_amount" className="block text-sm font-medium text-gray-700">
                      Bill Amount
                    </label>
                    <input
                      type="number"
                      name="bill_amount"
                      id="bill_amount"
                      value={otherawakData.bill_amount}
                      onChange={handleInputChange}
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
      <ToastNotification /> {/* Toast notification */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit} // Confirm triggers form submission
        message="Are you sure you want to submit the form?"
      />
    </SideBar>
  );
};

export default UpdateOtherawak;
