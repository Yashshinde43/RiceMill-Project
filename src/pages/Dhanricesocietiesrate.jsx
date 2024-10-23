import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/Sidebar";

const Dhanricesocietiesrate = () => {
  const [DhanricesocietiesrateData, setDhanricesocietiesrateData] = useState({
    society_name_id: "",
    distance: null,
    new: null,
  });

  // Fetch data for the "Society" dropdown
  const [societies, setSocieties] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    async function fetchsociety() {
      try {
        const society_response = await axios.get(
          `${apiBaseUrl}/societies/`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = society_response.data;
        setSocieties(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchsociety();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDhanricesocietiesrateData({
      ...DhanricesocietiesrateData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(DhanricesocietiesrateData);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/dhan-rice-societies-rate`,
        DhanricesocietiesrateData,
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );

      if (response.status === 201 || response.status === 300) {
        console.log("Dhan rice societies rate added successfully");
        toast.success("Dhan rice societies rate added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Failed to Dhan rice societies rate");
        toast.error("Failed to Dhan rice societies rate", {
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
      toast.error("Error adding Dhan rice societies rate", {
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
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Dhan Rice Societies Rate
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="society_name_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Society
                    </label>
                  </div>
                  <div className="mt-1">
                    <select
                      name="society_name_id"
                      type="number"
                      value={DhanricesocietiesrateData.society_name_id}
                      className="bg-white block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleInputChange}
                    >
                      <option value="">Select a society</option>
                      {societies.map((societie) => (
                        <option
                          key={societie.society_id}
                          value={societie.society_id}
                        >
                          {societie.society_name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2  text-sm text-gray-500">
                      Cannot Find Society?{" "}
                      <a
                        href="/Add_New_Society"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Add New Society.
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between flex-wrap">
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="distance"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Distance From Mill
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="distance"
                        value={DhanricesocietiesrateData.distance}
                        className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="new"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        New
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="number"
                        name="new"
                        value={DhanricesocietiesrateData.new}
                        className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Dhan Rice Societies Rate
                </button>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </SideBar>
    </>
  );
};

export default Dhanricesocietiesrate;
