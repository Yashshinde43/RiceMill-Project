import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "../inputelement/Selectinput";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

const Update_Agreement = () => {
  const { id } = useParams(); // Get the ID of the agreement from the URL
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const [agreementData, setAgreementData] = useState({
    rice_mill_id: 0,
    rice_mill_name: "", // Include the rice mill name
    agreement_number: "",
    lot_from: 0,
    lot_to: 0,
    type_of_agreement: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch agreement details including rice mill info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch the specific agreement details
        const agreementResponse = await axios.get(`${apiBaseUrl}/get-agreement/${id}`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });

        if (agreementResponse.status === 200) {
          setAgreementData(agreementResponse.data);
          setIsLoading(false);
        } else {
          toast.error("Failed to fetch agreement details");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };

    fetchData();
  }, [apiBaseUrl, apiKey, id]);

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

      const response = await axios.put(
        `${apiBaseUrl}/update-agreement/${id}`,
        agreementData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Agreement updated successfully");
        navigate("/show-agreements"); // Navigate to the agreement list page
      } else {
        toast.error("Failed to update agreement");
      }
    } catch (error) {
      console.error("Error updating agreement:", error);
      toast.error("Error updating agreement");
    }
  };

  return (
    <SideBar>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update Agreement
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <SelectInput
                  label="Select Rice Mill"
                  name="rice_mill_id"
                  options={[
                    {
                      label: agreementData.rice_mill_name,
                      value: agreementData.rice_mill_id,
                    },
                  ]}
                  value={
                    agreementData.rice_mill_id
                      ? {
                          label: agreementData.rice_mill_name,
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
                <Inputbox
                  label="Agreement Number"
                  type="text"
                  name="agreement_number"
                  value={agreementData.agreement_number}
                  onChange={handleInputChange}
                  placeholder="ACXXXXXXXXXXXX"
                  required
                />
                <Inputbox
                  label="Lot From"
                  type="number"
                  name="lot_from"
                  value={agreementData.lot_from}
                  onChange={handleInputChange}
                  required
                />
                <Inputbox
                  label="Lot To"
                  type="number"
                  name="lot_to"
                  value={agreementData.lot_to}
                  onChange={handleInputChange}
                  required
                />
                <Inputbox
                  label="Type of Agreement"
                  type="text"
                  name="type_of_agreement"
                  value={agreementData.type_of_agreement}
                  onChange={handleInputChange}
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Agreement
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </SideBar>
  );
};

export default Update_Agreement;
