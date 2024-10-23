import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "../inputelement/Selectinput";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";

const Add_Agreement = () => {
  const [agreementData, setAgreementData] = useState({
    rice_mill_id: null,
    agreement_number: "",
    lot_from: null,
    lot_to: null,
    type_of_agreement: "",
  });
  const initialData = {
    rice_mill_id: null,
    agreement_number: "",
    lot_from: null,
    lot_to: null,
    type_of_agreement: "",
  };
  const resetForm = () => {
    setAgreementData(initialData);
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [agreementOptions, setAgreementOptions] = useState([]);

  // Fetch data for the "Select Rice Mill" dropdown
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiBaseUrl}/get-all-rice-mills/`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,

          },
        });
        setAgreementOptions(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching rice mills:", error);
        toast.error("Error fetching rice mills");
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgreementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!agreementData.agreement_number.match(/AC\d{12}/)) {
      toast.error("Invalid Agreement Number format. It should be 'AC' followed by 12 digits.");
      return;
    }
    if (agreementData.lot_from >= agreementData.lot_to) {
      toast.error("Lot From must be less than Lot To.");
      return;
    }
    if (!agreementData.type_of_agreement) {
      toast.error("Please select an Agreement Type.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${apiBaseUrl}/add-agreement/`,
        agreementData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Agreement added successfully");
        resetForm();
      } else {
        toast.error("Failed to add Agreement");
      }
    } catch (error) {
      console.error("Error adding agreement:", error);
      toast.error("Error adding Agreement");
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
            Add Agreement
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <SelectInput
                label="Select Rice Mill"
                name="rice_mill_id"
                options={agreementOptions.map((option) => ({
                  label: option.rice_mill_name,
                  value: option.rice_mill_id,
                }))}
                value={
                  agreementData.rice_mill_id
                    ? {
                        label: agreementOptions.find(
                          (option) => option.rice_mill_id === agreementData.rice_mill_id
                        ).rice_mill_name,
                        value: agreementData.rice_mill_id,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "rice_mill_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Mill"
              />
              <div>
                <label
                  htmlFor="type_of_agreement"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Select Agreement Type
                </label>
                <div className="mt-1">
                  <select
                    value={agreementData.type_of_agreement}
                    onChange={handleInputChange}
                    name="type_of_agreement"
                    className="bg-white block w-full px-1.5 rounded-md border-0 py-2.5 text-gray-500 focus:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">-Select Agreement Type-</option>
                    <option value="FCI">FCI</option>
                    <option value="NAN">NAN</option>
                  </select>
                </div>
              </div>
              <Inputbox
                name="agreement_number"
                label="Agreement Number"
                value={agreementData.agreement_number}
                type="text"
                pattern="AC\d{12}"
                onChange={handleInputChange}
              />
              <fieldset className="flex flex-wrap my-5 mx-16">
                <Inputbox
                  label="Lot From"
                  name="lot_from"
                  value={agreementData.lot_from}
                  type="number"
                  onChange={handleInputChange}
                />
                <Inputbox
                  label="Lot To"
                  type="number"
                  name="lot_to"
                  value={agreementData.lot_to}
                  onChange={handleInputChange}
                />
              </fieldset>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Agreement
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </SideBar>
  );
};

export default Add_Agreement;
