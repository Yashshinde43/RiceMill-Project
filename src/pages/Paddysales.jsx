import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
import Inputbox from "../inputelement/Inputbox";
import SideBar from "../components/Sidebar";
const Paddysales = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const [paddysalesData, setpaddysalesData] = useState({
    rst_number_id: "",
    party_id: "",
    date: "",
    rice_mill_name_id: "",
    broker: "",
    loading_form_address: "",
    truck_number_id: "",
    paddy_name: "",
    party_weight: 0,
    weight: "",
    bags: "",
    rate: 0,
    ammount: 0,
    plastic: 0,
    joot_old: 0,
    joot_23_24: 0,
    joot_22_23: 0,
    average_bag_wt: 0,
  });
  const [Alldata, setAlldata] = useState([]);

  useEffect(() => {
    async function fetchMillData() {
      try {
        const All_data = await axios.get(
          `${apiBaseUrl}/rice-truck-party-brokers`,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
          }
        );

        const data = All_data.data;
        setAlldata(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMillData();
  }, []);
  // const [rstData, setrstData] = useState([]);
  // useEffect(() => {
  //   async function fetchrst() {
  //     try {
  //       const rst_response = await axios.get(
  //         "http://139.84.133.223:3000/dhan-awak-data",
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             "api-key": apiKey,
  //           },
  //         }
  //       );

  //       const data = rst_response.data;
  //       setrstData(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  //   fetchrst();
  // }, []);

  const [trucks, setTrucks] = useState([]);
  useEffect(() => {
    async function fetchTransporter() {
      try {
        const transporter_response = await axios.get(
          `${apiBaseUrl}/trucks/`,
          {
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
          }
        );

        const data = transporter_response.data;
        setTrucks(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchTransporter();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setpaddysalesData({
      ...paddysalesData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    console.log(paddysalesData);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiBaseUrl}/paddy-sale`,
        paddysalesData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status === 201) {
        console.log("Form data sent successfully");
        toast.success("Paddy Sales added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Failed to send form data");
        toast.error("Failed to add Paddy Sales", {
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
      toast.error("Error Adding Paddy Sales", {
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
    <>
    <SideBar>

      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />

          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Paddy Sales
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
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
                    paddysalesData.rice_mill_name_id
                      ? {
                          label: Alldata.rice_mill_data.find(
                            (option) =>
                              option.rice_mill_id ===
                              paddysalesData.rice_mill_name_id
                          ).rice_mill_name,
                          value: paddysalesData.rice_mill_name_id,
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
                <div className="flex justify-between my-3 flex-wrap">
                  <div className="my-2.5">
                    <label
                      htmlFor="rst_number_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      RST Number
                    </label>

                    <div className="mt-1">
                      <input
                        onChange={handleInputChange}
                        type="number"
                        name="rst_number_id"
                        value={paddysalesData.rst_number_id}
                        className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Date
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        value={paddysalesData.date}
                        onChange={handleInputChange}
                        type="date"
                        name="date"
                        className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  {/* <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="party"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Party
                      </label>
                    </div>
                    <div className="my-3">
                      <input
                        // required
                        type="text"
                        name="party"
                        className="block min-w-[250px] rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.party}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div> */}
                  <SelectInput
                  label="Party"
                  name="party_id"
                  options={
                    Alldata.party_data &&
                    Alldata.party_data.map((option) => ({
                      label: option.party_name,
                      value: option.party_id,
                    }))
                  }
                  value={
                    paddysalesData.party_id
                      ? {
                          label: Alldata.party_data.find(
                            (option) =>
                              option.party_id ===
                              paddysalesData.party_id
                          ).party_name,
                          value: paddysalesData.party_id,
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
                  placeholder="Select Party"
                />

                  {/* <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="broker"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Broker
                      </label>
                    </div>
                    <div className="my-3">
                      <input
                        // required
                        type="text"
                        name="broker"
                        className="block min-w-[250px] w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.broker}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div> */}
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
                      paddysalesData.broker
                        ? {
                            label: Alldata.brokers_data?.find(
                              (option) => option.broker_id === paddysalesData.broker // Assuming matching by broker_id
                            )?.broker_name || 'Unknown', // Default to 'Unknown' if broker_name is undefined
                            value: paddysalesData.broker,
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
                    placeholder="Select broker"
                  />

                </div>
                <div className="my-2.5">
                  <label
                    htmlFor="truck_number_id"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    truck Number
                  </label>

                  <div className="mt-1">
                    <select
                      name="truck_number_id"
                      type="number"
                      value={paddysalesData.truck_number_id}
                      className=" bg-white block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={handleInputChange}
                    >
                      <option value="">Select a Truck</option>
                      {trucks.map((truck) => (
                        <option key={truck.truck_id} value={truck.truck_id}>
                          {truck.truck_number}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-1.5 text-sm text-gray-500">
                    Cannot Find Truck?{" "}
                    <a
                      href="/Add_NEw_Truck"
                      className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                      Add New Truck.
                    </a>
                  </p>
                </div>
                <Inputbox
                  label="Party Weight"
                  name="party_weight"
                  type="number"
                  value={paddysalesData.party_weight}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage Percent"
                />
                <div className="flex justify-between my-3 flex-wrap">
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="loading_form_address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Loading From
                      </label>
                    </div>
                    <div className="">
                      <input
                        // required
                        type="text"
                        name="loading_form_address"
                        className="block min-w-[250px] rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.loading_form_address}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="paddy_name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Type Of Paddy
                      </label>
                    </div>
                    <div className="">
                      <select
                        value={paddysalesData.paddy_name}
                        onChange={handleInputChange}
                        type="text"
                        name="paddy_name"
                        className="bg-white block min-w-[250px] px-1.5 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select Type of Paddy</option>
                        <option value="Mota">Mota</option>
                        <option value="Patla">Patla</option>
                        <option value="Sarna">Sarna</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="weight"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Weight
                      </label>
                    </div>
                    <div className="">
                      <input
                        // required
                        type="number"
                        name="weight"
                        className="block min-w-[250px] rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="bags"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Bags
                      </label>
                    </div>
                    <div className="">
                      <input
                        // required
                        type="number"
                        name="bags"
                        className="block min-w-[250px] w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.bags}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="rate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Rate
                      </label>
                    </div>
                    <div className="">
                      <input
                        // required
                        type="number"
                        name="rate"
                        className="block min-w-[250px] rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.rate}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="ammount"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Amount
                      </label>
                    </div>
                    <div className="">
                      <input
                        disabled
                        // required
                        type="number"
                        name="ammount"
                        className="block min-w-[250px] w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={
                          (paddysalesData.ammount =
                            paddysalesData.rate *
                            paddysalesData.weight).toFixed(6) || 0
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-3 flex-wrap">
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="plastic"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Plastic
                      </label>
                    </div>
                    <div className="">
                      <input
                        // required
                        type="number"
                        name="plastic"
                        className="block min-w-[250px] rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.plastic}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="joot_old"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Jute Old
                      </label>
                    </div>
                    <div className="">
                      <input
                        // required
                        type="number"
                        name="joot_old"
                        className="block min-w-[250px] w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.joot_old}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between my-3 flex-wrap">
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="joot_23_24"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Jute 23-24
                      </label>
                    </div>
                    <div className="">
                      <input
                        // required
                        type="number"
                        name="joot_23_24"
                        className="block min-w-[250px] rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.joot_23_24}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <label
                        htmlFor="joot_22_23"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Jute 22-24
                      </label>
                    </div>
                    <div className="">
                      <input
                        // required
                        type="number"
                        name="joot_22_23"
                        className="block min-w-[250px] w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={paddysalesData.joot_22_23}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    <label
                      htmlFor="average_bag_wt"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Average Bag Weight
                    </label>
                  </div>
                  <div className="">
                    <input
                      // required
                      disabled
                      type="number"
                      name="average_bag_wt"
                      className="block min-w-[250px] rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={
                        (paddysalesData.average_bag_wt =
                          (paddysalesData.weight * 100) /
                          paddysalesData.party_weight).toFixed(6) || 0
                      }
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="flex w-full my-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Paddy Sales
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      
    </SideBar>
    </>
  );
};

export default Paddysales;
