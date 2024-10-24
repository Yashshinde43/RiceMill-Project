import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Dateinput from "../inputelement/Dateinput";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";

const Huskjawak = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [HuskjawakData, setHuskjawakData] = useState({
    rst_number: null,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    remarks: "",
    broker: "",
    brokerage_percentage: null,
    weight: null,
    rate: null,
    number_of_bags: null,
    truck_number_id: "",
    total: null,
    brokerage: null,
    net_receivable: null,
    received_date: "",
    loading_date: "",
    payment_received: null,
    number_of_days: null,
    payment_difference: null,
  });

  const [Alldata, setAlldata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

  const initialHuskjawakData = {
    rst_number: null,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    remarks: "",
    broker: "",
    brokerage_percentage: null,
    weight: null,
    rate: null,
    number_of_bags: null,
    truck_number_id: "",
    total: null,
    brokerage: null,
    net_receivable: null,
    received_date: "",
    loading_date: "",
    payment_received: null,
    number_of_days: null,
    payment_difference: null,
  };

  const resetForm = () => {
    setHuskjawakData(initialHuskjawakData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHuskjawakData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${apiBaseUrl}/husk-jawak/`,
        HuskjawakData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 201 && response.status < 300) {
        toast.success("Husk Jawak added successfully");
        resetForm();
      } else {
        toast.error("Failed to add Husk Jawak");
      }
    } catch (error) {
      toast.error("Error adding Husk Jawak");
    }
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the confirmation modal
  };

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   // Add navigation to login page if token is not present
    //   navigate("/login");
    // }

    async function fetchMillData() {
      try {
        const All_data = await axios.get(
          `${apiBaseUrl}/rice-truck-party-brokers`,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = All_data.data;
        setAlldata(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMillData();
  }, [apiKey, apiBaseUrl]);

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
            Add Husk Jawak
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[740px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="flex justify-between flex-wrap ">
                {/* <Inputbox
                  label="RST"
                  name="rst_number"
                  type="number"
                  value={HuskjawakData.rst_number}
                  onChange={handleInputChange}
                  placeholder="Enter rst number"
                /> */}
                <Dateinput
                  value={HuskjawakData.date}
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
                  HuskjawakData.party_id
                    ? {
                        label: Alldata.party_data.find(
                          (option) => option.party_id === HuskjawakData.party_id
                        ).party_name,
                        value: HuskjawakData.party_id,
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
              <div className="flex justify-between flex-wrap">
                <SelectInput
                  label="Select Rice Mill"
                  name="rice_mill_name_id"
                  options={
                    Alldata.rice_mill_data &&
                    Alldata.rice_mill_data.map((option) => ({
                      label: option.rice_mill_name,
                      value: option.rice_mill_id,
                    }))
                  }
                  value={
                    HuskjawakData.rice_mill_name_id
                      ? {
                          label: Alldata.rice_mill_data.find(
                            (option) =>
                              option.rice_mill_id ===
                              HuskjawakData.rice_mill_name_id
                          ).rice_mill_name,
                          value: HuskjawakData.rice_mill_name_id,
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
                  label="Broker"
                  name="broker"
                  options={
                    Alldata.brokers_data &&
                    Alldata.brokers_data.map((option) => ({
                      label: option.broker_name,
                      value: option.broker_id,
                    }))
                  }
                  value={
                    HuskjawakData.broker
                      ? {
                          label: Alldata.brokers_data.find(
                            (option) =>
                              option.broker_id === HuskjawakData.broker
                          ).broker_name,
                          value: HuskjawakData.broker,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "broker",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Broker"
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Brokerage Percent"
                  name="brokerage_percentage"
                  type="number"
                  value={HuskjawakData.brokerage_percentage}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage Percent"
                />
                <Inputbox
                  label=" Weight"
                  name="weight"
                  type="number"
                  value={HuskjawakData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter Weight "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Rate"
                  name="rate"
                  type="number"
                  value={HuskjawakData.rate}
                  onChange={handleInputChange}
                  placeholder="Enter Rate "
                />
                <Inputbox
                  label="Number of Bags"
                  name="number_of_bags"
                  type="number"
                  value={HuskjawakData.number_of_bags}
                  onChange={handleInputChange}
                  placeholder="Enter Number of Bags "
                />
              </div>
              <div className="flex justify-between flex-wrap">
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
                    HuskjawakData.truck_number_id
                      ? {
                          label: Alldata.truck_data.find(
                            (option) =>
                              option.truck_id === HuskjawakData.truck_number_id
                          ).truck_number,
                          value: HuskjawakData.truck_number_id,
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
                  label="Total"
                  name="total"
                  type="number"
                  value={
                    (HuskjawakData.total =
                      HuskjawakData.rate * HuskjawakData.weight)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter total "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Brokerage"
                  name="brokerage"
                  type="number"
                  value={(HuskjawakData.brokerage = HuskjawakData.weight * 7)}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage "
                />
                <Inputbox
                  label=" Net Receivable"
                  name="net_receivable"
                  type="number"
                  value={
                    (HuskjawakData.net_receivable =
                      HuskjawakData.total - HuskjawakData.brokerage)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter Net Receivable "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Dateinput
                  label="Loading Date"
                  name="loading_date"
                  value={HuskjawakData.loading_date}
                  onChange={handleInputChange}
                />
                <Dateinput
                  label="Received Date"
                  name="received_date"
                  value={HuskjawakData.received_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Payment Received"
                  name="payment_received"
                  type="number"
                  value={HuskjawakData.payment_received}
                  onChange={handleInputChange}
                  placeholder="Enter Payment Received"
                />
                <Inputbox
                  label="Number of Days"
                  name="number_of_days"
                  type="number"
                  value={HuskjawakData.number_of_days}
                  onChange={handleInputChange}
                  placeholder="Enter Number of Days "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Payment Difference"
                  name="payment_difference"
                  type="number"
                  value={
                    (HuskjawakData.payment_difference =
                      HuskjawakData.total - HuskjawakData.payment_received)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter Payment Difference "
                />
                <Inputbox
                  label="Remarks "
                  name="remarks"
                  type="text"
                  value={HuskjawakData.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter  Remarks "
                />
              </div>
              {/* Add other input fields similarly */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Husk Jawak
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastNotification /> {/* Include the ToastNotification component */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        message="Are you sure you want to submit the form?"
      />
    </SideBar>
  );
};

export default Huskjawak;
