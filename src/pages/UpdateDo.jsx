import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification";
import SelectInput from "../inputelement/Selectinput";
import Dateinput from "../inputelement/Dateinput";
import Inputbox from "../inputelement/Inputbox";

const UpdateDo = () => {
  const { id } = useParams(); // To get the ID from the URL for updating
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

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
  const [isModalOpen, setIsModalOpen] = useState(false); // For confirmation modal
  const [isLoading, setIsLoading] = useState(true); // Loading state for data fetching

  // Fetch DO data by ID for updating
  const fetchDoData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiBaseUrl}/do-data-by-id/${id}`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        setDoData(response.data);
        setIsLoading(false);
      } else {
        throw new Error("Data not found");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch DO data");
      setIsLoading(false);
    }
  };

  // Fetch related options (mills, agreements, etc.)
  const fetchDoOptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${apiBaseUrl}/rice-agreement-transporter-truck-society-data`,
        {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoOptions(response.data); // Set fetched data directly for form options
    } catch (error) {
      toast.error("Failed to fetch options data");
    }
  };

  useEffect(() => {
    fetchDoData(); // Fetch DO data for update
    fetchDoOptions(); // Fetch options for form selects
  }, [id]);

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
      mota_Bardana:
        name === "mota_weight" ? 2.5 * +value : prevData.mota_Bardana,
      patla_bardana:
        name === "patla_weight" ? 2.5 * +value : prevData.patla_bardana,
      sarna_bardana:
        name === "sarna_weight" ? 2.5 * +value : prevData.sarna_bardana,
      total_weight:
        (+prevData.mota_weight || 0) +
        (+prevData.patla_weight || 0) +
        (+prevData.sarna_weight || 0),
      total_bardana:
        (+prevData.mota_Bardana || 0) +
        (+prevData.patla_bardana || 0) +
        (+prevData.sarna_bardana || 0),
    }));
  };

  const handleConfirmSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${apiBaseUrl}/update-do-data/${id}`,
        DoData,
        {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("DO updated successfully");
        resetForm();
        navigate("/show-do");
      } else {
        toast.error("Failed to update DO");
      }
    } catch (error) {
      toast.error(error.message || "Error updating DO");
    }
    setIsModalOpen(false); // Close modal
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open confirmation modal
  };

  if (isLoading) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <SideBar>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Do
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <SelectInput
                label="Select Rice Mill"
                name="select_mill_id"
                options={
                  DoOptions.rice_mill_data
                    ? DoOptions.rice_mill_data.map((option) => ({
                        label: option.rice_mill_name,
                        value: option.rice_mill_id,
                      }))
                    : []
                }
                value={
                  DoData.select_mill_id
                    ? {
                        label: DoOptions.rice_mill_data?.find(
                          (option) =>
                            option.rice_mill_id === DoData.select_mill_id
                        )?.rice_mill_name,
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

              <Dateinput
                label="Date"
                name="date"
                value={DoData.date}
                onChange={handleInputChange}
              />

              <Inputbox
                label="Do Number"
                name="do_number"
                value={DoData.do_number}
                onChange={handleInputChange}
                placeholder="Enter DO Number"
              />

              <SelectInput
                label="Agreement Number"
                name="select_argeement_id"
                options={
                  DoOptions.agreement_data
                    ? DoOptions.agreement_data.map((option) => ({
                        label: option.agreement_number,
                        value: option.agremennt_id,
                      }))
                    : []
                }
                value={
                  DoData.select_argeement_id
                    ? {
                        label: DoOptions.agreement_data?.find(
                          (option) =>
                            option.agremennt_id === DoData.select_argeement_id
                        )?.agreement_number,
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

              <Inputbox
                label="Mota Weight"
                name="mota_weight"
                value={DoData.mota_weight}
                onChange={handleInputChange}
                placeholder="Enter Mota Weight"
                type="number"
              />

              {/* <Inputbox
                label="Mota Bardana"
                name="mota_Bardana"
                value={DoData.mota_Bardana}
                onChange={handleInputChange}
                type="number"
              /> */}

              <Inputbox
                label="Patla Weight"
                name="patla_weight"
                value={DoData.patla_weight}
                onChange={handleInputChange}
                placeholder="Enter Patla Weight"
                type="number"
              />

              {/* <Inputbox
                label="Patla Bardana"
                name="patla_bardana"
                value={DoData.patla_bardana}
                onChange={handleInputChange}
                type="number"
              /> */}

              <Inputbox
                label="Sarna Weight"
                name="sarna_weight"
                value={DoData.sarna_weight}
                onChange={handleInputChange}
                placeholder="Enter Sarna Weight"
                type="number"
              />

              {/* <Inputbox
                label="Sarna Bardana"
                name="sarna_bardana"
                value={DoData.sarna_bardana}
                onChange={handleInputChange}
                type="number"
              /> */}

              <Inputbox
                label="Total Weight"
                name="total_weight"
                value={DoData.total_weight}
                readOnly
                type="number"
              />

              <Inputbox
                label="Total Bardana"
                name="total_bardana"
                value={DoData.total_bardana}
                readOnly
                type="number"
              />

              <SelectInput
                label="Society Name"
                name="society_name_id"
                options={
                  DoOptions.society_data &&
                  Array.isArray(DoOptions.society_data)
                    ? DoOptions.society_data.map((option) => ({
                        label: option.society_name,
                        value: option.society_id,
                      }))
                    : []
                }
                value={
                  DoData.society_name_id
                    ? {
                        label:
                          DoOptions.society_data?.find(
                            (option) =>
                              option.society_id === DoData.society_name_id
                          )?.society_name || "",
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
                  DoOptions.truck_data && Array.isArray(DoOptions.truck_data)
                    ? DoOptions.truck_data.map((option) => ({
                        label: option.truck_number,
                        value: option.truck_id,
                      }))
                    : []
                }
                value={
                  DoData.truck_number_id
                    ? {
                        label:
                          DoOptions.truck_data?.find(
                            (option) =>
                              option.truck_id === DoData.truck_number_id
                          )?.truck_number || "",
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

              <div className="pt-4 flex justify-between">
                <button
                  type="submit"
                  className="w-1/2 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update DO
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for confirmation */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmSubmit} // Confirm handler triggers form submission
        message="Are you sure you want to submit the form?"
      />

      {/* Toast Notification */}
      <ToastNotification />
    </SideBar>
  );
};

export default UpdateDo;
