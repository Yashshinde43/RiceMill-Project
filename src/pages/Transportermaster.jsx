import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SideBar from "../components/Sidebar";

const Transportermaster = () => {
  const [transportermasteData, settransportermasteData] = useState({
    vehicle_number_id: "",
    name: "",
    phone_number: null,
    date: "",
    advance_payment: null,
    transporter_name_id: "",
  });

  // Fetch data for the "Select transporter" dropdown
  const [transpoterOptions, setTransporterOptions] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    async function fetchData() {
      try {
        const transporter_response = await axios.get(
          `${apiBaseUrl}/transporters/`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = transporter_response.data;
        setTransporterOptions(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  // Fetch data for the "truck" dropdown
  const [trucks, setTrucks] = useState([]);
  useEffect(() => {
    async function fetchTransporter() {
      try {
        const transporter_response = await axios.get(
          `${apiBaseUrl}/trucks/`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = transporter_response.data;
        setTrucks(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchTransporter();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    settransportermasteData({
      ...transportermasteData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(transportermasteData);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/transporter-master/`,
        transportermasteData, // Move data here
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );

      // console.log(response.data);

      if (response.status === 201) {
        console.log("Transporter Master added successfully");
        toast.success("Transporter Master added successfully", {
          autoClose: 2000,
        });
      } else {
        console.error("Failed to add Transporter Master");
        toast.error("Failed to add Transporter Master");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred");
    }
  };


  return (
    <>
      <SideBar>

        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Add Transporter Master
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="vehicle_number_id"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    truck Number
                  </label>

                  <div className="mt-1">
                    <select
                      name="vehicle_number_id"
                      type="text"
                      value={transportermasteData.vehicle_number_id}
                      className=" bg-white block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleInputChange}
                    >
                      <option value="">Select a Truck</option>
                      {trucks.map((truck) => (
                        <option key={truck.truck_id} value={truck.truck_id}>
                          {truck.truck_number}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Cannot Find Truck?{" "}
                    <a
                      href="/Add_NEw_Truck"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Add New Truck.
                    </a>
                  </p>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Name
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      required
                      type="text"
                      name="name"
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Enter Your Full Name"
                      value={transportermasteData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Date
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      required
                      type="date"
                      name="date"
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={transportermasteData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between flex-wrap">
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="phone_number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone number
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        pattern="[0-9]{10}"
                        required
                        type="number"
                        name="phone_number"
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={transportermasteData.phone_number}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="advance_payment"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Advance Payment
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        required
                        type="number"
                        name="advance_payment"
                        className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={transportermasteData.advance_payment}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="transporter_name_id"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select Transporter
                  </label>
                  <div className="mt-2">
                    <select
                      required
                      type="text"
                      name="transporter_name_id"
                      className="block  w-full bg-white rounded-md  border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={transportermasteData.transporter_name_id}
                      onChange={handleInputChange}
                    >
                      <option value="">-Select a transporter-</option>
                      {transpoterOptions.map((option) => (
                        <option
                          key={option.transporter_id}
                          value={option.transporter_id}
                        >
                          {option.transporter_name}
                        </option>
                      ))}
                    </select>
                    <p className="mt-2 text-center text-sm text-gray-500">
                      Cannot Find Transporter?{" "}
                      <a
                        href="/Add_NEw_Transporter"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                      >
                        Add New Transporter.
                      </a>
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Transporter Master
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

export default Transportermaster;
