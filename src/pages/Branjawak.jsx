import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Dateinput from "../inputelement/Dateinput";
import Inputbox from "../inputelement/Inputbox";
import SelectInput from "../inputelement/Selectinput";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification"; // Import the ToastNotification component
import axios from "axios";

const Branjawak = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const [BranjawakData, setBranjawakData] = useState({
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    broker: "",
    brokerage_percentage: 0,
    weight: 0,
    rate: 0,
    number_of_bags: 0,
    truck_number_id: "",
    total: 0,
    brokerage: 0,
    net_receivable: 0,
    payment_received: 0,
    payment_difference: 0,
    remarks: "",
    oil: 0,
  });

  const [Alldata, setAlldata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for confirmation modal

  const initialBranjawakData = {
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    broker: "",
    brokerage_percentage: 0,
    weight: 0,
    rate: 0,
    number_of_bags: 0,
    truck_number_id: "",
    total: 0,
    brokerage: 0,
    net_receivable: 0,
    payment_received: 0,
    payment_difference: 0,
    remarks: "",
    oil: 0,
  };

  useEffect(() => {
    async function fetchMillData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${apiBaseUrl}/rice-truck-party-brokers`,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setAlldata(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error fetching data");
      }
    }

    fetchMillData();
  }, [apiBaseUrl, apiKey]);

  const resetForm = () => {
    setBranjawakData(initialBranjawakData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBranjawakData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${apiBaseUrl}/bran-jawak`,
        BranjawakData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Bran Jawak added successfully");
        resetForm();
      } else {
        toast.error("Failed to add Bran Jawak");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding Bran Jawak");
    }
    setIsModalOpen(false); // Close the modal after submission
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the confirmation modal
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
            Add Bran Jawak
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[740px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="RST"
                  name="rst_number"
                  type="number"
                  value={BranjawakData.rst_number}
                  onChange={handleInputChange}
                  placeholder="Enter RST number"
                />
                <Dateinput
                  value={BranjawakData.date}
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
                  BranjawakData.party_id
                    ? {
                        label: Alldata.party_data.find(
                          (option) => option.party_id === BranjawakData.party_id
                        ).party_name,
                        value: BranjawakData.party_id,
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
                    BranjawakData.rice_mill_name_id
                      ? {
                          label: Alldata.rice_mill_data.find(
                            (option) =>
                              option.rice_mill_id ===
                              BranjawakData.rice_mill_name_id
                          ).rice_mill_name,
                          value: BranjawakData.rice_mill_name_id,
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
                    BranjawakData.broker
                      ? {
                          label: Alldata.brokers_data.find(
                            (option) =>
                              option.broker_id === BranjawakData.broker
                          ).broker_name,
                          value: BranjawakData.broker,
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
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Brokerage Percent"
                  name="brokerage_percentage"
                  type="number"
                  value={BranjawakData.brokerage_percentage}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage Percent"
                />
                <Inputbox
                  label=" Weight"
                  name="weight"
                  type="number"
                  value={BranjawakData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter Weight "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Rate"
                  name="rate"
                  type="number"
                  value={BranjawakData.rate}
                  onChange={handleInputChange}
                  placeholder="Enter Rate "
                />
                <Inputbox
                  label="Number of Bags"
                  name="number_of_bags"
                  type="number"
                  value={BranjawakData.number_of_bags}
                  onChange={handleInputChange}
                  placeholder="Enter Number of Bags "
                />
              </div>
              <div className="flex justify-between flex-wrap ">
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
                    BranjawakData.truck_number_id
                      ? {
                          label: Alldata.truck_data.find(
                            (option) =>
                              option.truck_id === BranjawakData.truck_number_id
                          ).truck_number,
                          value: BranjawakData.truck_number_id,
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
                    (BranjawakData.total =
                      BranjawakData.rate * BranjawakData.weight)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter total "
                />
              </div>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Brokerage"
                  name="brokerage"
                  type="number"
                  value={(BranjawakData.brokerage = BranjawakData.weight * 7)}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage "
                />
                <Inputbox
                  label=" Net Receivable"
                  name="net_receivable"
                  type="number"
                  value={
                    (BranjawakData.net_receivable =
                      BranjawakData.total - BranjawakData.brokerage)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter Net Receivable "
                />
              </div>

              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Payment Received"
                  name="payment_received"
                  type="number"
                  value={BranjawakData.payment_received}
                  onChange={handleInputChange}
                  placeholder="Enter Payment Received"
                />
                <Inputbox
                  label="Oil Percentage"
                  name="oil"
                  type="number"
                  value={BranjawakData.oil}
                  onChange={handleInputChange}
                  placeholder="Enter Oil Percentage "
                />
              </div>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Payment Difference"
                  name="payment_difference"
                  type="number"
                  value={
                    (BranjawakData.payment_difference =
                      BranjawakData.total - BranjawakData.payment_received)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter Payment Difference "
                />
                <Inputbox
                  label=" Remarks "
                  name="remarks"
                  type="text"
                  value={BranjawakData.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter  Remarks "
                />
              </div>
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Bran Jawak
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

export default Branjawak;
