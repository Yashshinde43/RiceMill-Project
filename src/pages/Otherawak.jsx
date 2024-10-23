import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dateinput from "../inputelement/Dateinput";
import "react-toastify/dist/ReactToastify.css";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import SideBar from "../components/Sidebar";
import SelectInput from "../inputelement/Selectinput";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";

const Otherawak = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [OtherawakData, setOtherawakData] = useState({
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    truck_number_id: "",
    material: "",
    nos: 0,
    reason: "",
    weight: 0,
    bill_amount: 0,
  });
  const [Alldata, setAlldata] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchMillData() {
      try {
        const token = localStorage.getItem('token');
        const All_data = await axios.get(
          `${apiBaseUrl}/rice-truck-party-brokers`,
          {
            headers: {
              "api-key": apiKey,
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        const data = All_data.data;
        setAlldata(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMillData();
  }, []);
  const initialOtherawakData = {
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    truck_number_id: "",
    material: "",
    nos: 0,
    reason: "",
    weight: 0,
    bill_amount: 0,
  };
  const resetForm = () => {
    setOtherawakData(initialOtherawakData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOtherawakData({
      ...OtherawakData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(OtherawakData);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${apiBaseUrl}/other-awak`,
        OtherawakData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Other Awak added successfully");
        toast.success("Other Awak added successfully", {
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
        console.error("Failed to add Other Awak");
        toast.error("Failed to add Other Awak", {
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
      toast.error("Error adding Other Awak", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setIsModalOpen(false);
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
            Add Other Awak
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
                  value={OtherawakData.rst_number}
                  onChange={handleInputChange}
                  placeholder="Enter rst number"
                />
                <Dateinput
                  value={OtherawakData.date}
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
                  OtherawakData.party_id
                    ? {
                        label: Alldata.party_data.find(
                          (option) => option.party_id === OtherawakData.party_id
                        ).party_name,
                        value: OtherawakData.party_id,
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
                    OtherawakData.rice_mill_name_id
                      ? {
                          label: Alldata.rice_mill_data.find(
                            (option) =>
                              option.rice_mill_id ===
                              OtherawakData.rice_mill_name_id
                          ).rice_mill_name,
                          value: OtherawakData.rice_mill_name_id,
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
                  options={
                    Alldata.truck_data &&
                    Alldata.truck_data.map((option) => ({
                      label: option.truck_number,
                      value: option.truck_id,
                    }))
                  }
                  value={
                    OtherawakData.truck_number_id
                      ? {
                          label: Alldata.truck_data.find(
                            (option) =>
                              option.truck_id === OtherawakData.truck_number_id
                          ).truck_number,
                          value: OtherawakData.truck_number_id,
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

              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Material"
                  name="material"
                  type="text"
                  value={OtherawakData.material}
                  onChange={handleInputChange}
                  placeholder="Enter material "
                />
                <Inputbox
                  label="NOS"
                  name="nos"
                  type="number"
                  value={OtherawakData.nos}
                  onChange={handleInputChange}
                  placeholder="Enter Number NOS "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Weight"
                  name="weight"
                  type="number"
                  value={OtherawakData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight "
                />
                <Inputbox
                  label="Bill Amount"
                  name="bill_amount"
                  type="number"
                  value={OtherawakData.bill_amount}
                  onChange={handleInputChange}
                  placeholder="Enter Bill Amount "
                />
              </div>
              <Inputbox
                label="Reason"
                name="reason"
                type="text"
                value={OtherawakData.reason}
                onChange={handleInputChange}
                placeholder="Enter reason "
              />
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Other Awak
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

export default Otherawak;
