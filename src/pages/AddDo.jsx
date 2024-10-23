import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
import Dateinput from "../inputelement/Dateinput";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar"; // Layout component for consistency
import ConfirmationModal from "../components/ConfirmationModal"; // Modal component
import ToastNotification from "../components/ToastNotification"; // Toast component

const Add_Do = () => {
  const [DoData, setDoData] = useState({
    select_mill_id: "",
    date: "",
    do_number: "",
    select_argeement_id: "",
    mota_weight: 0,
    mota_Bardana: 0,
    patla_weight: 0,
    patla_bardana: 0,
    sarna_weight: 0,
    sarna_bardana: 0,
    total_weight: 0,
    total_bardana: 0,
    society_name_id: "",
    truck_number_id: "",
  });

  const [DoOptions, setDoOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchMillData() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${apiBaseUrl}/rice-agreement-transporter-truck-society-data`,
          {
            headers: {
              "api-key": apiKey,
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        setDoOptions(response.data); // Set fetched data directly
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    }
    fetchMillData();
  }, []);

  const resetForm = () => {
    setDoData({
      select_mill_id: "",
      date: "",
      do_number: "",
      select_argeement_id: "",
      mota_weight: 0,
      mota_Bardana: 0,
      patla_weight: 0,
      patla_bardana: 0,
      sarna_weight: 0,
      sarna_bardana: 0,
      total_weight: 0,
      total_bardana: 0,
      society_name_id: "",
      truck_number_id: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoData((prevData) => ({
      ...prevData,
      [name]: value,
      mota_Bardana: name === "mota_weight" ? 2.5 * +value : prevData.mota_Bardana,
      patla_bardana: name === "patla_weight" ? 2.5 * +value : prevData.patla_bardana,
      sarna_bardana: name === "sarna_weight" ? 2.5 * +value : prevData.sarna_bardana,
      total_weight: (+prevData.mota_weight || 0) + (+prevData.patla_weight || 0) + (+prevData.sarna_weight || 0),
      total_bardana: (+prevData.mota_Bardana || 0) + (+prevData.patla_bardana || 0) + (+prevData.sarna_bardana || 0),
    }));
  };

  const handleConfirmSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${apiBaseUrl}/add-do/`, DoData, {
        headers: {
          "api-key": apiKey,
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 201) {
        toast.success("DO added successfully");
        resetForm();
      } else {
        toast.error("Failed to add DO");
      }
    } catch (error) {
      toast.error("Error adding DO");
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
            Add Do
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              onSubmit={handleFormSubmit} // Changed to handleFormSubmit for confirmation modal
              className="space-y-6"
            >
              <SelectInput
                label="Select Rice Mill"
                name="select_mill_id"
                options={
                  DoOptions.rice_mill_data &&
                  DoOptions.rice_mill_data.map((option) => ({
                    label: option.rice_mill_name,
                    value: option.rice_mill_id,
                  }))
                }
                value={
                  DoData.select_mill_id
                    ? {
                        label: DoOptions.rice_mill_data.find(
                          (option) =>
                            option.rice_mill_id === DoData.select_mill_id
                        ).rice_mill_name,
                        value: DoData.select_mill_id,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "select_mill_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Mill"
              />
              <div>
                <Dateinput
                  value={DoData.date}
                  onChange={handleInputChange}
                  label="Date"
                  name="date"
                />
              </div>

              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Do Number"
                  name="do_number"
                  value={DoData.do_number}
                  onChange={handleInputChange}
                  placeholder="Enter DO Number"
                  pattern="DO\d{13}"
                  required={true}
                />
                <SelectInput
                  label="Agreement Number"
                  name="select_argeement_id"
                  options={
                    DoOptions.agreement_data &&
                    DoOptions.agreement_data.map((option) => ({
                      label: option.agreement_number,
                      value: option.agremennt_id,
                    }))
                  }
                  value={
                    DoData.select_argeement_id
                      ? {
                          label: DoOptions.agreement_data.find(
                            (option) =>
                              option.agremennt_id === DoData.select_argeement_id
                          ).agreement_number,
                          value: DoData.select_argeement_id,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "select_argeement_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Agreement"
                />
              </div>

              {/* Input fields for weights and bardana */}
              <Inputbox
                label="Mota Weight"
                name="mota_weight"
                value={DoData.mota_weight}
                onChange={handleInputChange}
                placeholder="Enter Mota Weight"
                type="number"
              />
              <Inputbox
                label="Patla Weight"
                name="patla_weight"
                value={DoData.patla_weight}
                onChange={handleInputChange}
                placeholder="Enter Patla Weight"
                type="number"
              />
              <Inputbox
                label="Sarna Weight"
                name="sarna_weight"
                value={DoData.sarna_weight}
                onChange={handleInputChange}
                placeholder="Enter Sarna Weight"
                type="number"
              />

              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Total Weight"
                  name="total_weight"
                  value={DoData.total_weight}
                  onChange={handleInputChange}
                  placeholder="Total Weight"
                  type="number"
                  readOnly
                />
                <Inputbox
                  label="Total Bardana"
                  name="total_bardana"
                  value={DoData.total_bardana}
                  onChange={handleInputChange}
                  placeholder="Total Bardana"
                  type="number"
                  readOnly
                />
              </div>

              {/* Additional fields */}
              <SelectInput
                label="Society Name"
                name="society_name_id"
                options={
                  DoOptions.society_data &&
                  DoOptions.society_data.map((option) => ({
                    label: option.society_name,
                    value: option.society_id,
                  }))
                }
                value={
                  DoData.society_name_id
                    ? {
                        label: DoOptions.society_data.find(
                          (option) =>
                            option.society_id === DoData.society_name_id
                        ).society_name,
                        value: DoData.society_name_id,
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
                label="Truck Number"
                name="truck_number_id"
                options={
                  DoOptions.truck_data &&
                  DoOptions.truck_data.map((option) => ({
                    label: option.truck_number,
                    value: option.truck_id,
                  }))
                }
                value={
                  DoData.truck_number_id
                    ? {
                        label: DoOptions.truck_data.find(
                          (option) =>
                            option.truck_id === DoData.truck_number_id
                        ).truck_number,
                        value: DoData.truck_number_id,
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
                placeholder="Select Truck"
              />

              {/* Submission button */}
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Add DO
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for confirmation */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Submit DO"
        message="Are you sure you want to submit this DO?"
        onConfirm={handleConfirmSubmit}
        onCancel={() => setIsModalOpen(false)}
      />

      {/* Toast notifications */}
      <ToastNotification />
    </SideBar>
  );
};

export default Add_Do;
