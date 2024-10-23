import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dateinput from "../inputelement/Dateinput";
import "react-toastify/dist/ReactToastify.css";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
import SideBar from "./Sidebar";
const Ricepurchased = () => {
  const [RicepurchaseData, setRicepurchaseData] = useState({
    rst_number: null,
    date: "",
    party_id: "",
    broker_id: "",
    truck_number_id: "",
    bags: null,
    mill_weight: null,
    party_weight: null,
    bill_to_rice_mill: "",
  });
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [Alldata, setAlldata] = useState([]);

  useEffect(() => {
    async function fetchMillData() {
      try {
        const All_data = await axios.get(
          `${apiBaseUrl}/rice-truck-party-brokers`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = All_data.data;
        // console.log(data);
        setAlldata(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMillData();
  }, []);
  const initialRicepurchaseData = {
    rst_number: null,
    date: "",
    party_id: "",
    broker_id: "",
    truck_number_id: "",
    bags: null,
    mill_weight: null,
    party_weight: null,
    bill_to_rice_mill: "",
  };
  const resetForm = () => {
    setRicepurchaseData(initialRicepurchaseData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setRicepurchaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const apiKey = import.meta.env.VITE_API_KEY;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiBaseUrl}/rice-purchase`,
        RicepurchaseData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Bhusi  added successfully");
        toast.success("Rice purchase added successfully", {
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
        console.error("Failed to add Rice purchaseData ");
        toast.error("Failed to add Rice purchaseData ", {
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
      toast.error("Error adding  Rice purchaseData", {
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
            Rice Purchased
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[740px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="RST"
                  name="rst_number"
                  type="number"
                  value={RicepurchaseData.rst_number}
                  onChange={handleInputChange}
                  placeholder="Enter rst number"
                />
                <Dateinput
                  value={RicepurchaseData.date}
                  onChange={handleInputChange}
                  label="Date"
                  name="date"
                />
              </div>
              <SelectInput
                label="Party"
                name="party_id"
                placeholder="Select Party"
                options={
                  Alldata.party_data &&
                  Alldata.party_data.map((option) => ({
                    label: option.party_name,
                    value: option.party_id,
                  }))
                }
                value={
                  RicepurchaseData.party_id
                    ? {
                      label: Alldata.party_data.find(
                        (option) =>
                          option.party_id === RicepurchaseData.party_id
                      ).party_name,
                      value: RicepurchaseData.party_id,
                    }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "party_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
              />
              <div className="flex justify-between flex-wrap ">
                <SelectInput
                  label="Broker"
                  name="broker_id"
                  options={
                    Alldata.brokers_data &&
                    Alldata.brokers_data.map((option) => ({
                      label: option.broker_name,
                      value: option.broker_id,
                    }))
                  }
                  value={
                    RicepurchaseData.broker_id
                      ? {
                        label: Alldata.brokers_data.find(
                          (option) =>
                            option.broker_id === RicepurchaseData.broker_id
                        ).broker_name,
                        value: RicepurchaseData.broker_id,
                      }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "broker_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Broker"
                />
                <SelectInput
                  label="Truck Number"
                  name="truck_number_id"
                  options={
                    Alldata.truck_data &&
                    Alldata.truck_data.map((option) => ({
                      label: option.truck_number,
                      value: option.truck_id,
                    }))
                  }
                  value={
                    RicepurchaseData.truck_number_id
                      ? {
                        label: Alldata.truck_data.find(
                          (option) =>
                            option.truck_id ===
                            RicepurchaseData.truck_number_id
                        ).truck_number,
                        value: RicepurchaseData.truck_number_id,
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
              </div>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Bags "
                  name="bags"
                  type="number"
                  value={RicepurchaseData.bags}
                  onChange={handleInputChange}
                  placeholder="Enter Number of bags"
                />
                <Inputbox
                  label="Mill Weight"
                  name="mill_weight"
                  type="number"
                  value={RicepurchaseData.mill_weight}
                  onChange={handleInputChange}
                  placeholder="Enter Mill Weight "
                />
              </div>

              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Party weight"
                  name="party_weight"
                  type="number"
                  value={RicepurchaseData.party_weight}
                  onChange={handleInputChange}
                  placeholder="Enter Party Weight "
                />

                <SelectInput
                  label="Select Rice Mill"
                  name="bill_to_rice_mill"
                  options={
                    Alldata.rice_mill_data &&
                    Alldata.rice_mill_data.map((option) => ({
                      label: option.rice_mill_name,
                      value: option.rice_mill_id,
                    }))
                  }
                  value={
                    RicepurchaseData.bill_to_rice_mill
                      ? {
                        label: Alldata.rice_mill_data.find(
                          (option) =>
                            option.rice_mill_id ===
                            RicepurchaseData.bill_to_rice_mill
                        ).rice_mill_name,
                        value: RicepurchaseData.bill_to_rice_mill,
                      }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "bill_to_rice_mill",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Mill"
                />
              </div>
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Rice Purchased
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

export default Ricepurchased;
