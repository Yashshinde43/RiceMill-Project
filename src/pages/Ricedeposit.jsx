import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
// import Select from "react-select";
import SelectInput from "../inputelement/Selectinput";
import axios from "axios";
import Variety from "../select_dropdown/Variety";
import DateInput from "../inputelement/Dateinput";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";
const Ricedeposit = () => {
  const [RicedepositData, setRicedepositData] = useState({
    rst_number: 0,
    date: "",
    lot_number: 0,
    ware_house_id: "",
    rice_mill_name_id: "",
    weight: 0,
    truck_number_id: "",
    bags: 0,
    transporting_total: 0,
    transporter_name_id: "",
    transporting_type: "",
    transporting_status: "",
    rate: 0,
    variety: "",
    halting: 0,
    rrga_wt: 0,
    data_2022_23: 0,
    data_2021_22: 0,
    pds: 0,
    old: 0,
    amount: 0,
    status: "",
    hamali: 0,
  });
  const initialDalaliData = {
    rst_number: 0,
    date: "",
    lot_number: 0,
    ware_house_id: "",
    rice_mill_name_id: "",
    weight: 0,
    truck_number_id: "",
    bags: 0,
    transporting_total: 0,
    transporter_name_id: "",
    transporting_type: "",
    transporting_status: "",
    rate: 0,
    variety: "",
    halting: 0,
    rrga_wt: 0,
    data_2022_23: 0,
    data_2021_22: 0,
    pds: 0,
    old: 0,
    amount: 0,
    status: "",
    hamali: 0,
  };
  const resetForm = () => {
    setRicedepositData(initialDalaliData);
  };
  const [RiceDeopsitOptions, setRiceDeposit] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  // Fetch data for the "Select Rice Mill" dropdown
  useEffect(() => {
    async function fetchMillData() {
      try {
        const rice_deposti_data = await axios.get(
          `${apiBaseUrl}/rice-truck-transporter-ware-house`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = rice_deposti_data.data;
        setRiceDeposit(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMillData();
  }, []);

  const [DoOptionswarehouse, setDoOptionswarehouse] = useState([]);
  useEffect(() => {
    async function fetchwarehouseid() {
      try {
        const warehouse = await axios.get(
          `${apiBaseUrl}/ware-house-data/${RicedepositData.ware_house_id}`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = warehouse.data;
        setDoOptionswarehouse(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (RicedepositData.ware_house_id) {
      fetchwarehouseid();
    }
  }, [RicedepositData.ware_house_id]);

  const [DoOptionstrucktransporter, setDoOptionsTruckTransporter] = useState(
    []
  );
  useEffect(() => {
    async function fetchtrucktransporter() {
      try {
        const rice_do_number = await axios.get(
          `${apiBaseUrl}/truck-transporter/${RicedepositData.transporter_name_id}`,
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

    if (RicedepositData.transporter_name_id) {
      fetchtrucktransporter();
    }
  }, [RicedepositData.transporter_name_id]);

  const handleSelectChange = (selectedOption) => {
    setRicedepositData({
      ...RicedepositData,
      variety: selectedOption.value,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRicedepositData({
      ...RicedepositData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(RicedepositData);
    try {
      const response = await axios.post(
        `${apiBaseUrl}/rice-deposite/`,
        RicedepositData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );
      // console.log("Response:", response);
      if (response.status === 201) {
        // console.log("Form data sent successfully");
        toast.success("Rice Deposit added successfully", {
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
        toast.error("Failed to add Rice Deposit", {
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
      toast.error("Error Adding Rice Deposit", {
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
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Rice Deposit
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Rst Number"
                  name="rst_number"
                  type="number"
                  value={RicedepositData.rst_number}
                  onChange={handleInputChange}
                />
                <DateInput
                  label="Date"
                  name="date"
                  onChange={handleInputChange}
                  value={RicedepositData.date}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Lot Number"
                  name="lot_number"
                  value={RicedepositData.lot_number}
                  type="number"
                  onChange={handleInputChange}
                />

                <SelectInput
                  label="Warehouse"
                  name="ware_house_id"
                  options={
                    RiceDeopsitOptions.ware_house_data &&
                    RiceDeopsitOptions.ware_house_data.map((option) => ({
                      label: option.ware_house_name,
                      value: option.ware_house_id,
                    }))
                  }
                  value={
                    RicedepositData.ware_house_id
                      ? {
                        label: RiceDeopsitOptions.ware_house_data.find(
                          (option) =>
                            option.ware_house_id ===
                            RicedepositData.ware_house_id
                        ).ware_house_name,
                        value: RicedepositData.ware_house_id,
                      }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "ware_house_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Warehouse"
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <SelectInput
                  label="Select Rice Mill"
                  name="rice_mill_name_id"
                  options={
                    RiceDeopsitOptions.rice_mill_data &&
                    RiceDeopsitOptions.rice_mill_data.map((option) => ({
                      label: option.rice_mill_name,
                      value: option.rice_mill_id,
                    }))
                  }
                  value={
                    RiceDeopsitOptions.rice_mill_name_id
                      ? {
                        label: RiceDeopsitOptions.rice_mill_data.find(
                          (option) =>
                            option.rice_mill_id ===
                            RiceDeopsitOptions.rice_mill_name_id
                        ).rice_mill_name,
                        value: RiceDeopsitOptions.rice_mill_name_id,
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
                <Inputbox
                  label="Weight"
                  name="weight"
                  type="number"
                  onChange={handleInputChange}
                  value={RicedepositData.weight}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <SelectInput
                  label="Select Transporter"
                  name="transporter_name_id"
                  options={
                    RiceDeopsitOptions.transporter_data &&
                    RiceDeopsitOptions.transporter_data.map((option) => ({
                      label: option.transporter_name,
                      value: option.transporter_id,
                    }))
                  }
                  value={
                    RicedepositData.transporter_name_id
                      ? {
                        label: RiceDeopsitOptions.transporter_data.find(
                          (option) =>
                            option.transporter_id ===
                            RicedepositData.transporter_name_id
                        ).transporter_name,
                        value: RicedepositData.transporter_name_id,
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
                <Inputbox
                  label="bags"
                  onChange={handleInputChange}
                  disabled={true}
                  name="bags"
                  type="number"
                  value={(RicedepositData.bags = 2 * RicedepositData.weight)}
                />
              </div>
              <div className="flex justify-between">
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
                    RicedepositData.truck_number_id
                      ? {
                        label: DoOptionstrucktransporter.truck_data.find(
                          (option) =>
                            option.truck_id ===
                            RicedepositData.truck_number_id
                        ).truck_number,
                        value: RicedepositData.truck_number_id,
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
                <div>
                  <Variety
                    value={RicedepositData.variety}
                    onSelectChange={handleSelectChange}
                  />
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Rate"
                  name="rate"
                  onChange={handleInputChange}
                  type="number"
                  disabled={true}
                  value={
                    (RicedepositData.rate =
                      DoOptionswarehouse.ware_house_transporting_rate || "")
                  }
                />
                <Inputbox
                  label="Hamali"
                  onChange={handleInputChange}
                  name="hamali"
                  type="number"
                  disabled
                  value={
                    (RicedepositData.hamali =
                      DoOptionswarehouse.hamalirate || "")
                  }
                />
                <Inputbox
                  label="Halting"
                  onChange={handleInputChange}
                  name="halting"
                  type="number"
                  value={RicedepositData.halting}
                />
              </div>

              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Transporting Total"
                  onChange={handleInputChange}
                  name="transporting_total"
                  type="number"
                  disabled={true}
                  value={
                    (RicedepositData.transporting_total =
                      RicedepositData.weight * RicedepositData.rate +
                      +RicedepositData.halting)
                  }
                />
                <Inputbox
                  label="Transporting Type"
                  onChange={handleInputChange}
                  name="transporting_type"
                  type="text"
                  value={RicedepositData.transporting_type}
                />
                <Inputbox
                  label="Transporting Status"
                  onChange={handleInputChange}
                  name="transporting_status"
                  type="text"
                  value={RicedepositData.transporting_status}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="RRGA Weight"
                  onChange={handleInputChange}
                  name="rrga_wt"
                  type="number"
                  value={RicedepositData.rrga_wt}
                />
                <Inputbox
                  label=" 2022-23"
                  type="number"
                  name="data_2022_23"
                  onChange={handleInputChange}
                  value={RicedepositData.data_2022_23}
                />
                <Inputbox
                  label="2021-22"
                  type="number"
                  name="data_2021_22"
                  onChange={handleInputChange}
                  value={RicedepositData.data_2021_22}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="OLD"
                  type="number"
                  name="pds"
                  onChange={handleInputChange}
                  value={RicedepositData.pds}
                />
                <Inputbox
                  label="PDS"
                  type="number"
                  name="old"
                  onChange={handleInputChange}
                  value={RicedepositData.old}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Amount Paid"
                  type="number"
                  name="amount"
                  onChange={handleInputChange}
                  value={RicedepositData.amount}
                />
                <Inputbox
                  label="Status"
                  type="text"
                  name="status"
                  onChange={handleInputChange}
                  value={RicedepositData.status}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Rice Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SideBar>

  );
};
export default Ricedeposit;
