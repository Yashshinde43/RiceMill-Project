import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Inputbox from "../inputelement/Inputbox";
import SelectInput from "../inputelement/Selectinput";
import DateInput from "../inputelement/Dateinput";
import SideBar from "../components/Sidebar";
const Dhantransporting = () => {
  const [dhantransportingData, setdhantransportingData] = useState({
    rst_number: null,
    date: "",
    do_number_id: "",
    society_name_id: "",
    rice_mill_name_id: "",
    dm_weight: null,
    truck_number_id: "",
    transporting_rate: null,
    numbers_of_bags: null,
    transporting_total: null,
    transporter_name_id: "",
    status: "",
    total_pending: null,
    total_paid: null,
  });
  const initialDoData = {
    rst_number: null,
    date: "",
    do_number_id: "",
    society_name_id: "",
    rice_mill_name_id: "",
    dm_weight: null,
    truck_number_id: "",
    transporting_rate: null,
    numbers_of_bags: null,
    transporting_total: null,
    transporter_name_id: "",
    status: "",
    total_pending: null,
    total_paid: null,
  };
  const resetForm = () => {
    setdhantransportingData(initialDoData);
  };
  // Fetch data for the "Do" dropdown
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [dopandingData, setdopandingData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/rice-rst-society-do-truck-transporter`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );
        const data = response.data;
        setdopandingData(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  const [DoOptionsrst, setDoOptionsRst] = useState([]);
  useEffect(() => {
    async function fetchagrementData() {
      try {
        const rst_data = await axios.get(
          ` ${apiBaseUrl}/rice-rst-number-do-number/${dhantransportingData.rice_mill_name_id}`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = rst_data.data;
        setDoOptionsRst(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (dhantransportingData.rice_mill_name_id) {
      fetchagrementData();
    }
  }, [dhantransportingData.rice_mill_name_id]);

  const [DoOptionstrucktransporter, setDoOptionsTruckTransporter] = useState(
    []
  );
  useEffect(() => {
    async function fetchtrucktransporter() {
      try {
        const rice_do_number = await axios.get(
          ` ${apiBaseUrl}/truck-transporter/${dhantransportingData.transporter_name_id}`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = rice_do_number.data;
        setDoOptionsTruckTransporter(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (dhantransportingData.transporter_name_id) {
      fetchtrucktransporter();
    }
  }, [dhantransportingData.transporter_name_id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdhantransportingData({
      ...dhantransportingData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    // console.log(dhantransportingData);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiBaseUrl}/dhan-transporting`,
        dhantransportingData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Form data sent successfully");
        toast.success("Dhan Transporting added successfully", {
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
        console.error("Failed to send form data");
        toast.error("Failed to add Dhan Transporting", {
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
      toast.error("Error Adding Dhan Transporting", {
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
            Add Dhan Transporting
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <SelectInput
                label="Select Rice Mill"
                name="rice_mill_name_id"
                options={
                  dopandingData.rice_mill_data &&
                  dopandingData.rice_mill_data.map((option) => ({
                    label: option.rice_mill_name,
                    value: option.rice_mill_id,
                  }))
                }
                value={
                  dhantransportingData.rice_mill_name_id
                    ? {
                      label: dopandingData.rice_mill_data.find(
                        (option) =>
                          option.rice_mill_id ===
                          dhantransportingData.rice_mill_name_id
                      ).rice_mill_name,
                      value: dhantransportingData.rice_mill_name_id,
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
              <DateInput
                label="Date"
                value={dhantransportingData.date}
                onChange={handleInputChange}
                name="date"
              />

              {/* <Inputbox
                  label="RST Number"
                  name="rst_number"
                  type="text"
                  onChange={handleInputChange}
                  value={dhantransportingData.rst_number}
                  /> */}

              <SelectInput
                label="DO Number"
                name="do_number_id"
                options={
                  DoOptionsrst.do_number_data &&
                  DoOptionsrst.do_number_data.map((option) => ({
                    label: option.do_number,
                    value: option.do_id,
                  }))
                }
                value={
                  dhantransportingData.do_number_id
                    ? {
                      label: DoOptionsrst.do_number_data.find(
                        (option) =>
                          option.do_id === dhantransportingData.do_number_id
                      ).do_number,
                      value: dhantransportingData.do_number_id,
                    }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "do_number_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select DO Number"
              />
           
              <div className="flex justify-between flex-wrap ">
                <SelectInput
                  label="Society"
                  name="society_name_id"
                  options={
                    dopandingData.society_data &&
                    dopandingData.society_data.map((option) => ({
                      label: option.society_name,
                      value: option.society_id,
                    }))
                  }
                  value={
                    dhantransportingData.society_name_id
                      ? {
                        label: dopandingData.society_data.find(
                          (option) =>
                            option.society_id ===
                            dhantransportingData.society_name_id
                        ).society_name,
                        value: dhantransportingData.society_name_id,
                      }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "society_name_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Society"
                />
                <SelectInput
                  label="Select Transporter"
                  name="transporter_name_id"
                  options={
                    dopandingData.transporter_data &&
                    dopandingData.transporter_data.map((option) => ({
                      label: option.transporter_name,
                      value: option.transporter_id,
                    }))
                  }
                  value={
                    dhantransportingData.transporter_name_id
                      ? {
                        label: dopandingData.transporter_data.find(
                          (option) =>
                            option.transporter_id ===
                            dhantransportingData.transporter_name_id
                        ).transporter_name,
                        value: dhantransportingData.transporter_name_id,
                      }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "transporter_name_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Transporter"
                />
              </div>
              <div className="flex justify-between flex-wrap ">
                <SelectInput
                  label="Truck Number"
                  name="truck_number_id"
                  options={
                    DoOptionstrucktransporter.truck_data &&
                    DoOptionstrucktransporter.truck_data.map((option) => ({
                      label: option.truck_number,
                      value: option.truck_id,
                    }))
                  }
                  value={
                    dhantransportingData.truck_number_id
                      ? {
                        label: DoOptionstrucktransporter.truck_data.find(
                          (option) =>
                            option.truck_id ===
                            dhantransportingData.truck_number_id
                        ).truck_number,
                        value: dhantransportingData.truck_number_id,
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
                <Inputbox
                  label="Rate"
                  type="number"
                  name="transporting_rate"
                  value={dhantransportingData.transporting_rate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="DM Weight"
                  type="number"
                  name="dm_weight"
                  value={dhantransportingData.dm_weight}
                  onChange={handleInputChange}
                />
                <Inputbox
                  label="Number of Bags"
                  disabled={true}
                  type="number"
                  name="numbers_of_bags"
                  value={
                    (dhantransportingData.numbers_of_bags =
                      dhantransportingData.dm_weight * 2)
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Transporting Total"
                  type="number"
                  name="transporting_total"
                  value={dhantransportingData.transporting_total}
                  onChange={handleInputChange}
                />

                <div className="">
                  <div className="flex justify-between">
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Status
                    </label>
                  </div>
                  <div className="">
                    <select
                      value={dhantransportingData.status}
                      onChange={handleInputChange}
                      type="text"
                      name="status"
                      className="bg-white min-w-[250px] block w-full px-1.5 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="">Select status</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Total Pending"
                  type="number"
                  name="total_pending"
                  value={dhantransportingData.total_pending}
                  onChange={handleInputChange}
                />
                <Inputbox
                  label="Total Paid"
                  type="number"
                  name="total_paid"
                  value={dhantransportingData.total_paid}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Dhan Transporting
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

export default Dhantransporting;
