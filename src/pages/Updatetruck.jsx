import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

const Update_Truck = () => {
  const { id } = useParams(); // Get the truck ID from the URL
  const navigate = useNavigate();
  
  const [truckData, setTruckData] = useState({
    truck_number: "",
    transport_id: 0,
  });
  
  const [loading, setLoading] = useState(false); // For button loading state
  const [transporterOptions, setTransporterOptions] = useState([]);
  const [loadingTransporters, setLoadingTransporters] = useState(true); // For dropdown loading

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  // Fetch data for the "Select transporter" dropdown
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const transporter_response = await axios.get(
          `${apiBaseUrl}/get-all-transporters/`,
          {
            headers: {
              "api-key": apiKey,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (
          transporter_response.status >= 200 &&
          transporter_response.status < 300
        ) {
          const data = transporter_response.data;
          setTransporterOptions(data);
        } else {
          console.error("Failed to fetch transporters");
          toast.error("Failed to fetch transporters");
        }
      } catch (error) {
        console.error("Error:", error.message || error);
        toast.error("Error fetching transporters");
      } finally {
        setLoadingTransporters(false);
      }
    }

    fetchData();
  }, [apiBaseUrl, apiKey]); // Add dependencies

  // Fetch truck data
  useEffect(() => {
    const fetchTruckData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiBaseUrl}/get-truck/${id}`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setTruckData(response.data);
        } else {
          toast.error("Failed to fetch truck data");
        }
      } catch (error) {
        console.error("Error fetching truck data:", error);
        toast.error("Error fetching truck data");
      }
    };

    fetchTruckData();
  }, [id, apiBaseUrl, apiKey]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTruckData({
      ...truckData,
      [name]: value,
    });
  };

  // Reset form
  const resetForm = () => {
    setTruckData({
      truck_number: "",
      transport_id: 0,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!truckData.transport_id) {
      toast.error("Please select a transporter");
      return;
    }
    
    setLoading(true); // Set loading state at the beginning
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(`${apiBaseUrl}/truck/${id}`, truckData, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) { 
        toast.success("Truck updated successfully");
        resetForm();
        navigate("/show-trucks"); // Navigate to the trucks list or desired route
      } else {
        toast.error("Failed to update truck");
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error ${error.response.status}: ${error.response.data.detail || "Error updating truck"}`);
      } else if (error.request) {
        toast.error("No response from server.");
      } else {
        toast.error("Error: " + error.message);
      }
    } finally {
      setLoading(false); // Ensure loading state is reset in finally
    }
  };

  return (
    <SideBar>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Truck
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Inputbox
                label="Truck Number"
                name="truck_number"
                placeholder="CG04KP1234"
                type="text"
                pattern="[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}"
                value={truckData.truck_number}
                onChange={handleInputChange}
                required
              />
              
              <div>
                <label
                  htmlFor="transport_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select Transporter
                </label>
                <div className="mt-2">
                  <select
                    required
                    name="transport_id"
                    className="block w-full bg-white rounded-md border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={truckData.transport_id}
                    onChange={handleInputChange}
                    disabled={loadingTransporters}
                  >
                    <option value="">-Select a transporter-</option>
                    {transporterOptions.map((option) => (
                      <option
                        key={option.transporter_id}
                        value={option.transporter_id}
                      >
                        {option.transporter_name}
                      </option>
                    ))}
                  </select>
                  {loadingTransporters && (
                    <p className="mt-2 text-sm text-gray-500">
                      Loading transporters...
                    </p>
                  )}
                  <p className="mt-2 text-center text-sm text-gray-500">
                    Cannot Find Transporter?{" "}
                    <a
                      href="/add-transporter"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Add New Transporter.
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  disabled={loading} // Disable button while loading
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default Update_Truck;
