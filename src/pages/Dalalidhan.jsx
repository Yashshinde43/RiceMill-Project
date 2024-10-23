import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import DateInput from "../inputelement/Dateinput";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Dalalidhan = () => {
  const [selectedPaddyType, setSelectedPaddyType] = useState("white_sarna");

  const [DalaliData, setDalaliData] = useState({
    rst_number: null,
    date: "",
    kochia_id: "",
    vehicale_number_id: "",
    white_sarna_bags: null,
    white_sarna_weight: null,
    ir_bags: null,
    ir_weight: null,
    rb_gold_bags: null,
    rb_gold_weight: null,
    sarna_bags: null,
    sarna_weight: null,
    sambha_new_bags: null,
    sambha_new_weight: null,
    paddy_type: "",
    total_bags: null,
    total_weight: null,
    hamali: null,
    jute_bag: null,
    plastic_bag: null,
    weight_less_kata_difference: null,
    net_weight: null,
    rate: null,
    amount: null,
  });
  const initialDalaliData = {
    rst_number: null,
    date: "",
    kochia_id: "",
    vehicale_number_id: "",
    white_sarna_bags: null,
    white_sarna_weight: null,
    ir_bags: null,
    ir_weight: null,
    rb_gold_bags: null,
    rb_gold_weight: null,
    sarna_bags: null,
    sarna_weight: null,
    sambha_new_bags: null,
    sambha_new_weight: null,
    paddy_type: "",
    total_bags: null,
    total_weight: null,
    hamali: null,
    jute_bag: null,
    plastic_bag: null,
    weight_less_kata_difference: null,
    net_weight: null,
    rate: null,
    amount: null,
  };
  const resetForm = () => {
    setDalaliData(initialDalaliData);
  };

  const [kochiaData, setkochiaData] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {

    async function fetchData() {
      try {
        const [kochiaResponse, truckResponse] = await Promise.all([
          axios.get(`${apiBaseUrl}/kochia-data`, {
            headers: {
              "api-key": apiKey,
            },
          }),
          axios.get(`${apiBaseUrl}/trucks/`, {
            headers: {
              "api-key": apiKey,
            },
          }),
        ]);

        const kochiadata = kochiaResponse.data;
        setkochiaData(kochiadata);
        const truckdata = truckResponse.data;
        setTrucks(truckdata);
        // console.log(truckdata);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setDalaliData({
      ...DalaliData,
      [name]: value,
    });
  };
  const handlePaddyTypeChange = (e) => {
    const { value } = e.target;
    setSelectedPaddyType(value);
    // console.log(value);

    // Optionally, you can reset the corresponding fields when the paddy type changes
    setDalaliData((prevData) => ({
      ...prevData,
      [`${value}_bags`]: 0,
      [`${value}_weight`]: 0,
    }));
  };

  const handleSubmit = async (e) => {
    const apiKey = import.meta.env.VITE_API_KEY;
    // console.log(DalaliData);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiBaseUrl}/dalali-dhaan`,
        DalaliData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status === 201) {
        // console.log("Form data sent successfully");
        toast.success("Dalali Dhan added successfully", {
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
        toast.error("Failed to add Dalali Dhan", {
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
      toast.error("Error Adding Dalali Dhan", {
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
  const calculateKataDifference = () => {
    if (DalaliData.total_weight <= 30 && DalaliData.total_weight > 0) {
      return 0.1;
    } else if (DalaliData.total_weight > 30 && DalaliData.total_weight <= 70) {
      return 0.2;
    } else if (DalaliData.total_weight > 70 && DalaliData.total_weight <= 120) {
      return 0.3;
    } else if (
      DalaliData.total_weight > 120 &&
      DalaliData.total_weight <= 150
    ) {
      return 0.4;
    } else if (
      DalaliData.total_weight > 150 &&
      DalaliData.total_weight <= 200
    ) {
      return 0.6;
    } else if (DalaliData.total_weight >= 200) {
      return 0.6;
    } else {
      return 0;
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
            Add Dalali Dhan
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[750px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-between flex-wrap">
                  <div className="my-2.5">
                    <SelectInput
                      label="Kochia"
                      name="kochia_id"
                      options={
                        kochiaData &&
                        kochiaData.map((option) => ({
                          label: option.kochia_name,
                          value: option.kochia_id,
                        }))
                      }
                      value={
                        DalaliData.kochia_id
                          ? {
                            label: kochiaData.find(
                              (option) =>
                                option.kochia_id === DalaliData.kochia_id
                            ).kochia_name,
                            value: DalaliData.kochia_id,
                          }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleInputChange({
                          target: {
                            name: "kochia_id",
                            value: selectedOption ? selectedOption.value : "",
                          },
                        })
                      }
                      placeholder="Enter Kochia name.."
                      linkText="Add New Kochia..."
                      linkHref="/Add_kochia"
                    />
                  </div>
                  <div className="mt-1">
                    <DateInput
                      label="Date"
                      name="date"
                      value={DalaliData.date}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <Inputbox
                  label="RST Number"
                  type="number"
                  name="rst_number"
                  value={DalaliData.rst_number}
                  onChange={handleInputChange}
                />

                <div className="my-2.5">
                  <div className="mt-1">
                    <SelectInput
                      label="Truck Number"
                      name="vehicale_number_id"
                      options={
                        trucks &&
                        trucks.map((option) => ({
                          label: option.truck_number,
                          value: option.truck_id,
                        }))
                      }
                      value={
                        DalaliData.vehicale_number_id
                          ? {
                            label: trucks.find(
                              (option) =>
                                option.truck_id ===
                                DalaliData.vehicale_number_id
                            ).truck_number,
                            value: DalaliData.vehicale_number_id,
                          }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleInputChange({
                          target: {
                            name: "vehicale_number_id",
                            value: selectedOption ? selectedOption.value : "",
                          },
                        })
                      }
                      placeholder="Enter Truck Number.."
                      linkText="Add New Truck."
                      linkHref="/Add_NEw_Truck"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between">
                    <label
                      htmlFor="paddy_type"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Type Of Paddy
                    </label>
                  </div>
                  <div className="mt-1">
                    <select
                      value={DalaliData.paddy_type}
                      onChange={(e) => {
                        handleInputChange(e);
                        handlePaddyTypeChange(e);
                      }}
                      type="text"
                      name="paddy_type"
                      className="bg-white min-w-[250px] block w-full px-1.5 rounded-md border-0 py-2.5 text-gray-500 focus:text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option className="text-gray-500" value="">
                        Select Type of Paddy....
                      </option>
                      <option value="white_sarna">White Sarna</option>
                      <option value="ir">IR</option>
                      <option value="rb_gold">RB Gold</option>
                      <option value="sarna">Sarna</option>
                      <option value="sambha_new">Sambha New</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor={`${selectedPaddyType}_bags`}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {capitalizeFirstLetter(selectedPaddyType)} Bags
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="number"
                        name={`${selectedPaddyType}_bags`}
                        value={DalaliData[`${selectedPaddyType}_bags`]}
                        disabled={!selectedPaddyType}
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor={`${selectedPaddyType}_weight`}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        {capitalizeFirstLetter(selectedPaddyType)} Weight
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="number"
                        name={`${selectedPaddyType}_weight`}
                        value={DalaliData[`${selectedPaddyType}_weight`]}
                        disabled={!selectedPaddyType}
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="total_bags"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Total Bags
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        disabled
                        type="number"
                        placeholder="Enter bags"
                        name="total_bags"
                        value={
                          (DalaliData.total_bags =
                            DalaliData[`${selectedPaddyType}_bags`] || 0)
                        }
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="total_weight"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Total Weights
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        disabled
                        type="number"
                        placeholder="Enter Total Weight"
                        name="total_weight"
                        value={
                          (DalaliData.total_weight =
                            DalaliData[`${selectedPaddyType}_weight`] || 0)
                        }
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 ">
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="hamali"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Hamali
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        disabled
                        type="number"
                        placeholder="Enter Hamali"
                        name="hamali"
                        value={
                          (DalaliData.hamali =
                            DalaliData[`${selectedPaddyType}_bags`] * 3 || 0)
                        }
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="plastic_bag"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Plastics bag
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="number"
                        placeholder="Enter bags"
                        name="plastic_bag"
                        value={DalaliData.plastic_bag}
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="jute_bag"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Jute bag
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="number"
                        placeholder="Enter Weight Less Jute"
                        name="jute_bag"
                        value={DalaliData.jute_bag}
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="weight_less_kata_difference"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Weight Less Kata Difference
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        disabled
                        type=""
                        placeholder="Enter Weight less Kata Difference"
                        name="weight_less_kata_difference"
                        value={
                          (DalaliData.weight_less_kata_difference =
                            calculateKataDifference())
                        }
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="net_weight"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Net Weight
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        disabled
                        type="number"
                        placeholder="Enter Net Weight"
                        name="net_weight"
                        value={(DalaliData.net_weight =
                          DalaliData.total_weight -
                          DalaliData.plastic_bag * 0.002 -
                          DalaliData.jute_bag * 0.007 -
                          DalaliData.weight_less_kata_difference).toFixed(3)}
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="rate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Rate
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="number"
                        placeholder="Enter Rate"
                        name="rate"
                        value={DalaliData.rate}
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between">
                      <label
                        htmlFor="ammount"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Amount
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        disabled
                        type="number"
                        placeholder="Enter Amount"
                        name="ammount"
                        value={
                          (DalaliData.amount =
                            (DalaliData.net_weight -
                              DalaliData.weight_less_kata_difference) *
                            DalaliData.rate -
                            DalaliData.hamali)
                        }
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full my-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Dalali Dhan
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

export default Dalalidhan;
