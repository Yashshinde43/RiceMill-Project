import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "../inputelement/Selectinput";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";
const Saudapatrak = () => {
  const [saudapatrakData, setsaudapatrakData] = useState({
    name: "",
    address: "",
    vechicle_number_id: "",
    paddy: "",
    bags: "",
    weight: null,
    rate: null,
    amount: null,
  });
  const initialDoData = {
    name: "",
    address: "",
    vechicle_number_id: "",
    paddy: "",
    bags: "",
    weight: null,
    rate: null,
    amount: null,
  };
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const resetForm = () => {
    setsaudapatrakData(initialDoData);
  };
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

    setsaudapatrakData({
      ...saudapatrakData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(saudapatrakData);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/sauda-patrak`,
        saudapatrakData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status === 201 || response.status === 300) {
        // console.log("Sauda Patrak added successfully");
        toast.success("Sauda Patrak added successfully", {
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
        console.error("Failed to add Sauda patrak");
        toast.error("Failed to add Sauda patrak", {
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
      toast.error("Error adding  Sauda patrak", {
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
            Add Sauda Patrak
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-between flex-wrap">
                  <Inputbox
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    onChange={handleInputChange}
                    value={saudapatrakData.date}
                  />
                  <Inputbox
                    label="Address"
                    type="text"
                    name="address"
                    placeholder="Enter Address"
                    value={saudapatrakData.address}
                    onChange={handleInputChange}
                  />
                </div>

                <SelectInput
                  label="Truck Number"
                  name="vechicle_number_id"
                  options={trucks.map((option) => ({
                    label: option.truck_number,
                    value: option.truck_id,
                  }))}
                  value={
                    saudapatrakData.vechicle_number_id
                      ? {
                        label: trucks.find(
                          (option) =>
                            option.truck_id ===
                            saudapatrakData.vechicle_number_id
                        ).truck_number,
                        value: saudapatrakData.vechicle_number_id,
                      }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "vechicle_number_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Truck Number"
                />
                <div className="mt-3">
                  <div className="flex justify-between">
                    <label
                      htmlFor="paddy"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type Of Paddy
                    </label>
                  </div>
                  <div className="mt-1">
                    <select
                      value={saudapatrakData.paddy}
                      onChange={handleInputChange}
                      type="text"
                      name="paddy"
                      className="bg-white block w-full px-1.5 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select Type of Paddy</option>
                      <option value="Mota">Mota</option>
                      <option value="Patla">Patla</option>
                      <option value="Sarna">Sarna</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between flex-wrap">
                  <Inputbox
                    label="Bags"
                    type="number"
                    placeholder="Enter bags"
                    name="bags"
                    value={saudapatrakData.bags}
                    onChange={handleInputChange}
                  />
                  <Inputbox
                    label="weight"
                    disabled={true}
                    type="number"
                    name="weight"
                    placeholder="Enter Weight"
                    value={
                      (saudapatrakData.weight = parseFloat(
                        (saudapatrakData.bags * 0.4).toFixed(1)
                      ))
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex justify-between flex-wrap">
                  <Inputbox
                    label="Rate"
                    type="number"
                    name="rate"
                    placeholder="Enter Rate"
                    value={saudapatrakData.rate}
                    onChange={handleInputChange}
                  />
                  <Inputbox
                    label="Amount"
                    disabled={true}
                    type="number"
                    placeholder="Enter Amount"
                    name="amount"
                    value={
                      (saudapatrakData.amount =
                        saudapatrakData.rate * saudapatrakData.weight)
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full mt-7 justify-center rounded-md bg-indigo-600 px-3 py-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Suda Patrak
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

export default Saudapatrak;
