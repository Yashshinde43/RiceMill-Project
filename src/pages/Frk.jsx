import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DateInput from "../inputelement/Dateinput";
import SelectInput from "../inputelement/Selectinput";
import Inputbox from "../inputelement/Inputbox";
import Input from "postcss/lib/input";
import SideBar from "../components/Sidebar";
const Frk = () => {
  const [frkData, setfrskData] = useState({
    batch_number: 0,
    date: "",
    party: "",
    bags: 0,
    weight: "",
    truck_number_id: "",
    rice_mill_name_id: "",
    bill_number: 0,
    rate: 0,
  });
  const initialData = {
    batch_number: 0,
    date: "",
    party: "",
    bags: 0,
    weight: "",
    truck_number_id: "",
    rice_mill_name_id: "",
    bill_number: 0,
    rate: 0,
  };
  const resetForm = () => {
    setfrskData(initialData);
  };

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
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setfrskData({
      ...frkData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(frkData);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/frk`,
        frkData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status === 201 || response.status === 300) {
        // console.log("frk added successfully");
        toast.success("frk added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resetForm();
      } else {
        console.error("Failed to add frk");
        toast.error("Failed to add frk", {
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
      toast.error("Error adding frk", {
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
    <SideBar>


      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Frk
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-between flex-wrap">
                <DateInput
                  label="Date"
                  name="date"
                  onChange={handleInputChange}
                  value={frkData.date}
                />
                <Inputbox
                  label="Party"
                  type="text"
                  name="party"
                  onChange={handleInputChange}
                  value={frkData.party}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Weight"
                  type="number"
                  name="weight"
                  value={frkData.weight}
                  onChange={handleInputChange}
                />
                <Inputbox
                  label="Bags"
                  type="number"
                  name="bags"
                  value={frkData.bags}
                  onChange={handleInputChange}
                />
              </div>
              <SelectInput
                label="Select Rice Mill"
                name="rice_mill_name_id"
                options={millData.map((option) => ({
                  label: option.rice_mill_name,
                  value: option.rice_mill_id,
                }))}
                value={
                  frkData.rice_mill_name_id
                    ? {
                      label: millData.find(
                        (option) =>
                          option.rice_mill_id === frkData.rice_mill_name_id
                      ).rice_mill_name,
                      value: frkData.rice_mill_name_id,
                    }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "rice_mill_name_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Mill"
              />

              <SelectInput
                label="Truck Number"
                name="truck_number_id"
                options={trucks.map((option) => ({
                  label: option.truck_number,
                  value: option.truck_id,
                }))}
                value={
                  frkData.truck_number_id
                    ? {
                      label: trucks.find(
                        (option) =>
                          option.truck_id === frkData.truck_number_id
                      ).truck_number,
                      value: frkData.truck_number_id,
                    }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "truck_number_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Truck Number"
              />
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Bill Number"
                  type="number"
                  name="bill_number"
                  value={frkData.bill_number}
                  onChange={handleInputChange}
                />
                <Inputbox
                  label="Rate"
                  type="number"
                  name="rate"
                  value={frkData.rate}
                  onChange={handleInputChange}
                />
              </div>
              <Inputbox
                label=" Batch Number"
                type="number"
                name="batch_number"
                value={frkData.batch_number}
                onChange={handleInputChange}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add FRK
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </SideBar>
  );
};

export default Frk;
