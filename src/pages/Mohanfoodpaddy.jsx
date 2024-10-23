import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SideBar from "../components/Sidebar";

const Mohanfoodpaddy = () => {
  const [mohanfoodpaddyData, setmohanfoodpaddyData] = useState({
    do_number_id: "",
    date: "",
    samiti: "",
    rice_mill_name_id: "",
    weight: null,
    vehicle_number_id: "",
    bags: null,
    transporting_total: null,
    transporter_name_id: "",
    transporter_type: "",
    transporter_status: "",
    rate: null,
    type_1: "",
    years_22_23: null,
    years_21_22: null,
    hdpe_one: null,
    hdpe_new: null,
    purana: null,
    pds: null,
  });
  const [doData, setdoData] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/add-do-data`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );
        const data = response.data;
        setdoData(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);
  // Fetch data for the "Select Rice Mill" dropdown
  const [millData, setmillData] = useState([]);
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
  // Fetch data for the "Select transporter" dropdown
  const [transpoterOptions, setTransporterOptions] = useState([]);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setmohanfoodpaddyData({
      ...mohanfoodpaddyData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    // console.log(mohanfoodpaddyData);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiBaseUrl}/mohan-food-paddy`,
        mohanfoodpaddyData,
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );

      if (response.status === 201) {
        console.log("Form data sent successfully");
        toast.success("Mohan Food Paddy added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Failed to send form data");
        toast.error("Failed to add Mohan Food Paddy", {
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
      toast.error("Error Adding Mohan Food Paddy", {
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
              Mohan Food Paddy
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <div className="flex justify-between m-3">
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="do_number_id"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          DO Numbar
                        </label>
                      </div>
                      <div className="mt-1">
                        <select
                          type="text"
                          name="do_number_id"
                          value={mohanfoodpaddyData.do_number_id}
                          className="block min-w-[260px]  w-full bg-white rounded-md  border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        >
                          <option value="">-Select Do Number-</option>
                          {doData.map((option) => (
                            <option key={option.do_id} value={option.do_id}>
                              {option.do_number}
                            </option>
                          ))}
                        </select>
                        <p className="mt-2 text-sm text-gray-500">
                          Cannot Find Do?{" "}
                          <a
                            href="/Add_Do"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                          >
                            Add New Do..
                          </a>
                        </p>
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
                      <div className="mt-1">
                        <input
                          value={mohanfoodpaddyData.date}
                          onChange={handleInputChange}
                          type="date"
                          name="date"
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between m-3">
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
                          type="text"
                          name="rice_mill_name_id"
                          className="block min-w-[250px] w-full bg-white rounded-md  border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          value={mohanfoodpaddyData.rice_mill_name_id}
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
                        <p className="mt-2 flex flex-wrap text-sm text-gray-500">
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
                      <div className="flex justify-between">
                        <label
                          htmlFor="samiti"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Samiti
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="samiti"
                          value={mohanfoodpaddyData.samiti}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between m-3">
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="weight"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Weight
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="weight"
                          value={mohanfoodpaddyData.weight}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="vehicle_number_id"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        truck Number
                      </label>

                      <div className="mt-2">
                        <select
                          name="vehicle_number_id"
                          type="text"
                          value={mohanfoodpaddyData.vehicle_number_id}
                          className=" bg-white block min-w-[250px] px-1.5 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        name="transporter_name_id"
                        type="text"
                        className="block  w-full bg-white rounded-md  border-0 px-1.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={mohanfoodpaddyData.transporter_name_id}
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
                      <p className="mt-2 text-sm text-gray-500">
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
                  <div className="flex justify-between m-3">
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="bags"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Bags
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="bags"
                          value={mohanfoodpaddyData.bags}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="transporting_total"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Transporting Total
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="transporting_total"
                          value={mohanfoodpaddyData.transporting_total}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between m-3">
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="transporter_type"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Transporting Type
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="transporter_type"
                          value={mohanfoodpaddyData.transporter_type}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="transporter_status"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Transporting Status
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="transporter_status"
                          value={mohanfoodpaddyData.transporter_status}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between m-3">
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="rate"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Rate
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="rate"
                          value={mohanfoodpaddyData.rate}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="type_1"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Type 1
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="type_1"
                          value={mohanfoodpaddyData.type_1}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between m-3">
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="years_22_23"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Years 22 23
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="years_22_23"
                          value={mohanfoodpaddyData.years_22_23}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="years_21_22"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Years 21 22
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="years_21_22"
                          value={mohanfoodpaddyData.years_21_22}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between m-3">
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="hdpe_one"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          HDPE One
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="hdpe_one"
                          value={mohanfoodpaddyData.hdpe_one}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="hdpe_new"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          HDPE New
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="hdpe_new"
                          value={mohanfoodpaddyData.hdpe_new}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between m-3">
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="purana"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Purana
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="purana"
                          value={mohanfoodpaddyData.purana}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="pds"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          PDS
                        </label>
                      </div>
                      <div className="mt-1">
                        <input
                          type="number"
                          name="pds"
                          value={mohanfoodpaddyData.pds}
                          className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 my-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Mohan food Paddy
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

export default Mohanfoodpaddy;
