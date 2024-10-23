import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/Sidebar";

const Lotnumbermaster = () => {
  const [lotnumbermasterData, setlotnumbermasterData] = useState({
    rice_mill_name_id: 0,
    lot_number: 0,
  });

  // Fetch data for the "Select Rice Mill" dropdown
  const [millData, setmillData] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    async function fetchMillData() {
      try {
        const Mill_response = await axios.get(
          `${apiBaseUrl}/rice-mill`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = Mill_response.data;
        setmillData(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMillData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setlotnumbermasterData({
      ...lotnumbermasterData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(lotnumbermasterData);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/lot-number-master`,
        lotnumbermasterData,
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );

      if (response.status === 201 || response.status === 300) {
        console.log(" added successfully");
        toast.success("  Lot Number Master added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Failed to add   Lot Number Master");
        toast.error("Failed to add   Lot Number Master", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding   Lot Number Master", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <SideBar>

        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Lot Number Master
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="rice_mill_name_id"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select Rice Mill
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      type="number"
                      name="rice_mill_name_id"
                      className="block  w-full bg-white rounded-md  border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={lotnumbermasterData.rice_mill_name_id}
                      onChange={handleInputChange}
                    >
                      <option value="">-Select Rice Mill-</option>
                      {millData.map((option) => (
                        <option
                          key={option.rice_mill_id}
                          value={option.rice_mill_id}
                        >
                          {option.rice_mill_name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-sm text-gray-500">
                      Cannot Find Rice Mill?{" "}
                      <a
                        href="/Addricemill"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Add New Rice Mill..
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Lot Number To That Mill
                  </label>
                  <input
                    type="number"
                    name="lot_number"
                    className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={lotnumbermasterData.lot_number}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Lot Number Master
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" />

      </SideBar>
    </>
  );
};

export default Lotnumbermaster;
