import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../components/Sidebar';
import Stacklocation from '../inputelement/Stacklocation';
import Ricemilldown from '../inputelement/Ricemilldown';
import Actualpaddy from '../inputelement/Actualpaddy';
import Paddy from '../inputelement/Paddy';
import { Select } from '@headlessui/react';
import ConfirmationModal from '../components/ConfirmationModal';
import ToastNotification from '../components/ToastNotification';
import { toast } from 'react-toastify';

const Updatedhanawaktest = () => {
    const customStyles = {
        control: (base) => ({
            ...base,
            height: 35,
            minheight: 30,
            width: 250,
            minwidth: 180,
        }),
        indicatorSeparator: (state) => ({
            display: "none",
        }),
    };

    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const apiKey = import.meta.env.VITE_API_KEY;

    const [DoOptionsricedonumber, setDoOptionsRiceDoNumber] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const [DhanAwakData, setFormData] = useState({
        rst_number: 0,
        rice_mill_id: "",
        date: "",
        do_id: "",
        society_id: "",
        dm_weight: 0,
        number_of_bags: 0,
        truck_number_id: "",
        transporter_name_id: "",
        transporting_rate: 0,
        transporting_total: 0,
        jama_jute_22_23: 0,
        ek_bharti_21_22: 0,
        pds: 0,
        miller_purana: 0,
        kisan: 0,
        bardana_society: 0,
        hdpe_22_23: 0,
        hdpe_21_22: 0,
        hdpe_21_22_one_use: 0,
        total_bag_weight: 0,
        type_of_paddy: "",
        actual_paddy: "",
        mill_weight_quintals: 0,
        shortage: 0,
        bags_put_in_hopper: 0,
        bags_put_in_stack: 0,
        hopper_rice_mill_id: "",
        stack_location: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [DoOptions, setDoOptions] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true); // Open the confirmation modal
    };
    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...DhanAwakData,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.put(
                `${apiBaseUrl}/update-dhanawak/${id}`,
                riceMill,
                {
                    headers: {
                        "api-key": apiKey,
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success("Dhanawak test is updated successfully");
                navigate("/updatedhanawaktest");
            } else {
                toast.error("Failed to update rice mill");
            }
        } catch (error) {
            console.error("Error updating rice mill:", error);

            if (error.response) {
                toast.error(
                    `Error: ${error.response.data.detail || error.response.statusText}`
                );
            } else if (error.request) {
                toast.error("No response received from the server");
            } else {
                toast.error("Error in setting up the request");
            }
        } finally {
            setIsModalOpen(false); // Close the modal after submission
        }
    };
    const [DoOptionstrucktransporter, setDoOptionsTruckTransporter] = useState(
        []
    );
    useEffect(() => {
        async function fetchtrucktransporter() {
            try {
                const token = localStorage.getItem('token');
                const rice_do_number = await axios.get(
                    `${apiBaseUrl}/truck-transporter/${DhanAwakData.transporter_name_id}`,
                    {
                        headers: {
                            "api-key": apiKey,
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );

                const data = rice_do_number.data;
                setDoOptionsTruckTransporter(data);
                // console.log(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        if (DhanAwakData.transporter_name_id) {
            fetchtrucktransporter();
        }
    }, [DhanAwakData.transporter_name_id, apiBaseUrl, apiKey]);


    useEffect(() => {
        async function fetchricedonumberData() {
            try {
                const token = localStorage.getItem('token');
                const truck_transporter = await axios.get(
                    ` ${apiBaseUrl}/rice-do-number/${DhanAwakData.rice_mill_id}`,
                    {
                        headers: {
                            "api-key": apiKey,
                            "Authorization": `Bearer ${token}`,
                        },
                    }
                );

                const data = truck_transporter.data;
                setDoOptionsRiceDoNumber(data);
                // console.log(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        if (DhanAwakData.rice_mill_id) {
            fetchricedonumberData();
        }
    }, [DhanAwakData.rice_mill_id, apiBaseUrl, apiKey]);

// fetch data for the select rice mill dropdown
    useEffect(() => {
        async function fetchMillData() {
            try {
                const token = localStorage.getItem("token");
                const Mill_response = await axios.get(
                    `${apiBaseUrl}/rice-do-society-truck-transporter`,
                    {
                        headers: {
                            "api-key": apiKey,
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = Mill_response.data;
                setDoOptions(data);
                console.log(data);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchMillData();
    }, [apiBaseUrl, apiKey]);


    const [societyData, setsocietyData] = useState([]);
    useEffect(() => {
      async function fetchtrucktransporter() {
        try {
          const token = localStorage.getItem('token');
          const society_rate = await axios.get(
            `${apiBaseUrl}/society-transporting-rate/${DhanAwakData.society_id}`,
            {
              headers: {
                "api-key": apiKey,
                "Authorization": `Bearer ${token}`,
              },
            }
          );
  
          const data = society_rate.data;
          setsocietyData(data);
          // console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
      }
  
      if (DhanAwakData.society_id) {
        fetchtrucktransporter();
      }
    }, [DhanAwakData.society_id, apiBaseUrl, apiKey]);
  

    return (
        <SideBar>

            <div>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Update Dhan Awak
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        {isLoading ? (
                            <p className="text-center text-indigo-600">Loading...</p>
                        ) : (
                            <form className="space-y-6" onSubmit={handleFormSubmit}>
                                <div className="flex justify-between flex-wrap">
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="rst_number"
                                                className="block mt-3 text-sm font-medium leading-6 text-gray-900"
                                            >
                                                RST Number
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                onChange={handleInputChange}
                                                type="number"
                                                name="rst_number"
                                                value={DhanAwakData.rst_number}
                                                className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="rice_mill_id"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Select Rice Mill
                                            </label>
                                        </div>

                                        <Select
                                            styles={customStyles}
                                            name="rice_mill_id"
                                            options={
                                                DoOptions.rice_mill_data &&
                                                DoOptions.rice_mill_data.map((option) => ({
                                                    label: option.rice_mill_name,
                                                    value: option.rice_mill_id,
                                                }))
                                            }
                                            value={
                                                DhanAwakData.rice_mill_id
                                                    ? {
                                                        label: DoOptions.rice_mill_data.find(
                                                            (option) =>
                                                                option.rice_mill_id ===
                                                                DhanAwakData.rice_mill_id
                                                        ).rice_mill_name,
                                                        value: DhanAwakData.rice_mill_id,
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
                                        />

                                        <p className="mt-2 text-sm text-gray-500">
                                            Cannot Find?{" "}
                                            <a
                                                href="/Addricemill"
                                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                            >
                                                Add New Rice Mill
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between flex-wrap">
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
                                                value={DhanAwakData.date}
                                                onChange={handleInputChange}
                                                type="date"
                                                name="date"
                                                className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="do_id"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Do Number
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <Select
                                                styles={customStyles}
                                                name="do_id"
                                                options={
                                                    DoOptionsricedonumber.do_number_data &&
                                                    DoOptionsricedonumber.do_number_data.map(
                                                        (option) => ({
                                                            label: option.do_number,
                                                            value: option.do_id,
                                                        })
                                                    )
                                                }
                                                value={
                                                    DhanAwakData.do_id
                                                        ? {
                                                            label:
                                                                DoOptionsricedonumber.do_number_data.find(
                                                                    (option) =>
                                                                        option.do_id === DhanAwakData.do_id
                                                                ).do_number,
                                                            value: DhanAwakData.do_id,
                                                        }
                                                        : null
                                                }
                                                onChange={(selectedOption) =>
                                                    handleInputChange({
                                                        target: {
                                                            name: "do_id",
                                                            value: selectedOption
                                                                ? selectedOption.value
                                                                : "",
                                                        },
                                                    })
                                                }
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Cannot Find Do?{" "}
                                            <a
                                                href="/Add_Do"
                                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                            >
                                                Add DO..
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between ">
                                        <label
                                            htmlFor="society_id"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Society
                                        </label>
                                    </div>
                                    <div className="mt-1">
                                        <Select
                                            styles={{
                                                indicatorSeparator: () => ({
                                                    display: "none",
                                                }),
                                            }}
                                            name="society_id"
                                            options={
                                                DoOptions.society_data &&
                                                DoOptions.society_data.map((option) => ({
                                                    label: option.society_name,
                                                    value: option.society_id,
                                                }))
                                            }
                                            value={
                                                DhanAwakData.society_id
                                                    ? {
                                                        label: DoOptions.society_data.find(
                                                            (option) =>
                                                                option.society_id ===
                                                                DhanAwakData.society_id
                                                        ).society_name,
                                                        value: DhanAwakData.society_id,
                                                    }
                                                    : null
                                            }
                                            onChange={(selectedOption) =>
                                                handleInputChange({
                                                    target: {
                                                        name: "society_id",
                                                        value: selectedOption ? selectedOption.value : "",
                                                    },
                                                })
                                            }
                                        />

                                        <p className="mt-2  text-sm text-gray-500">
                                            Cannot Find Society?{" "}
                                            <a
                                                href="/Add_New_Society"
                                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                            >
                                                Add New Society.
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-between flex-wrap">
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="dm_weight"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                DM Weight
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.dm_weight}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="dm_weight"
                                                className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="number_of_bags"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Number Of Bags
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                disabled
                                                value={(DhanAwakData.number_of_bags =
                                                    DhanAwakData.dm_weight * 2.5).toFixed(2)}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="number_of_bags"
                                                className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="transporter_name_id"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Select Transporter
                                    </label>
                                    <div className="mt-2">
                                        <Select
                                            styles={{
                                                indicatorSeparator: () => ({
                                                    display: "none",
                                                }),
                                            }}
                                            name="transporter_name_id"
                                            options={
                                                DoOptions.transporter_data &&
                                                DoOptions.transporter_data.map((option) => ({
                                                    label: option.transporter_name,
                                                    value: option.transporter_id,
                                                }))
                                            }
                                            value={
                                                DhanAwakData.transporter_name_id
                                                    ? {
                                                        label: DoOptions.transporter_data.find(
                                                            (option) =>
                                                                option.transporter_id ===
                                                                DhanAwakData.transporter_name_id
                                                        ).transporter_name,
                                                        value: DhanAwakData.transporter_name_id,
                                                    }
                                                    : null
                                            }
                                            onChange={(selectedOption) =>
                                                handleInputChange({
                                                    target: {
                                                        name: "transporter_name_id",
                                                        value: selectedOption ? selectedOption.value : "",
                                                    },
                                                })
                                            }
                                        />

                                        <p className="mt-2  text-sm text-gray-500">
                                            Cannot Find Transporter?{" "}
                                            <a
                                                href="/Add_NEw_Transporter"
                                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                            >
                                                Add New Transporter.
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="truck_number_id"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        truck Number
                                    </label>

                                    <div className="mt-1">
                                        <Select
                                            styles={{
                                                indicatorSeparator: () => ({
                                                    display: "none",
                                                }),
                                            }}
                                            name="truck_number_id"
                                            options={
                                                DoOptionstrucktransporter.truck_data &&
                                                DoOptionstrucktransporter.truck_data.map(
                                                    (option) => ({
                                                        label: option.truck_number,
                                                        value: option.truck_id,
                                                    })
                                                )
                                            }
                                            value={
                                                DhanAwakData.truck_number_id
                                                    ? {
                                                        label:
                                                            DoOptionstrucktransporter.truck_data.find(
                                                                (option) =>
                                                                    option.truck_id ===
                                                                    DhanAwakData.truck_number_id
                                                            ).truck_number,
                                                        value: DhanAwakData.truck_number_id,
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
                                        />
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">
                                        Cannot Find Truck?{" "}
                                        <a
                                            href="/Add_NEw_Truck"
                                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                        >
                                            Add New Truck.
                                        </a>
                                    </p>
                                </div>

                                <div className="flex justify-between flex-wrap">
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="transporting_rate"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Transporting Rate
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                disabled
                                                value={
                                                    (DhanAwakData.transporting_rate =
                                                        (societyData.society_transporting &&
                                                            societyData.society_transporting[0]
                                                                .transporting_rate) ||
                                                        "")
                                                }
                                                onChange={handleInputChange}
                                                type="number"
                                                name="transporting_rate"
                                                className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="transporting_total"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Transporting Total
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                disabled
                                                value={
                                                    (DhanAwakData.transporting_total =
                                                        DhanAwakData.dm_weight *
                                                        DhanAwakData.transporting_rate)
                                                }
                                                onChange={handleInputChange}
                                                type="number"
                                                name="transporting_total"
                                                className="block min-w-[250px] px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h2 className=" text-2xl font-black  ">Bardana Details</h2>
                                <div className="flex justify-between flex-wrap">
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="jama_jute_22_23"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Jama Jute 22-23
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.jama_jute_22_23}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="jama_jute_22_23"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="ek_bharti_21_22"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Ek Bharti 21-22
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.ek_bharti_21_22}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="ek_bharti_21_22"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="pds"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                PDS
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.pds}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="pds"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between flex-wrap">
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="miller_purana"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Miller Purana
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.miller_purana}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="miller_purana"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="kisan"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Kisan
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.kisan}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="kisan"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="bardana_society"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Society
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.bardana_society}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="bardana_society"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between flex-wrap">
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="hdpe_22_23"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                HDPE 22-23
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.hdpe_22_23}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="hdpe_22_23"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="hdpe_21_22"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                HDPE 21-22 New
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.hdpe_21_22}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="hdpe_21_22"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="hdpe_21_22_one_use"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                HDPE 21-22 One Use
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.hdpe_21_22_one_use}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="hdpe_21_22_one_use"
                                                className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between">
                                        <label
                                            htmlFor="total_bag_weight"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Total Bag Weight
                                        </label>
                                    </div>
                                    <div className="mt-1">
                                        <input
                                            disabled
                                            value={(DhanAwakData.total_bag_weight =
                                                ((+DhanAwakData.jama_jute_22_23 +
                                                    +DhanAwakData.ek_bharti_21_22 +
                                                    +DhanAwakData.pds +
                                                    +DhanAwakData.miller_purana +
                                                    +DhanAwakData.kisan +
                                                    +DhanAwakData.bardana_society) *
                                                    0.58) /
                                                100 +
                                                ((+DhanAwakData.hdpe_22_23 +
                                                    +DhanAwakData.hdpe_21_22 +
                                                    +DhanAwakData.hdpe_21_22_one_use) *
                                                    0.2) /
                                                100).toFixed(2)}
                                            onChange={handleInputChange}
                                            type="number"
                                            name="total_bag_weight"
                                            className="block w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                                    <div className="w-full">
                                        <Paddy
                                            value={DhanAwakData.type_of_paddy}
                                            onChange={(name, value) =>
                                                handleInputChange({ target: { name, value } })
                                            }
                                        />
                                    </div>

                                    <div className="w-full">
                                        <Actualpaddy
                                            value={DhanAwakData.actual_paddy}
                                            onChange={(name, value) =>
                                                handleInputChange({ target: { name, value } })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between flex-wrap">
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="mill_weight_quintals"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Mill Weight (Quintals)
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.mill_weight_quintals}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="mill_weight_quintals"
                                                className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="shortage"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Shortage
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                disabled
                                                value={(DhanAwakData.shortage =
                                                    DhanAwakData.mill_weight_quintals -
                                                    DhanAwakData.total_bag_weight -
                                                    DhanAwakData.dm_weight).toFixed(2)}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="shortage"
                                                className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h2 className=" text-2xl font-black  ">Stack Details</h2>

                                <fieldset className="flex justify-between flex-wrap">
                                    <legend>Bags Put In Hopper</legend>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="bags_put_in_hopper"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Quantity
                                            </label>
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                value={DhanAwakData.bags_put_in_hopper}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="bags_put_in_hopper"
                                                className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Ricemilldown
                                            value={DhanAwakData.hopper_rice_mill_id}
                                            // onSelectChange={handleSelectChange}
                                            onChange={(name, value) =>
                                                handleInputChange({ target: { name, value } })
                                            }
                                        />
                                    </div>
                                </fieldset>

                                <fieldset className="flex justify-between flex-wrap">
                                    <legend className="my-5">Bags Put In Stack</legend>
                                    <div>
                                        <div className="flex justify-between">
                                            <label
                                                htmlFor="bags_put_in_stack"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Quantity
                                            </label>
                                        </div>
                                        <div className="mt-1">
                                            <input
                                                value={DhanAwakData.bags_put_in_stack}
                                                onChange={handleInputChange}
                                                type="number"
                                                name="bags_put_in_stack"
                                                className="block min-w-[250px] w-full px-1.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Stacklocation
                                            value={DhanAwakData.stack_location}
                                            onChange={(name, value) =>
                                                handleInputChange({ target: { name, value } })
                                            }
                                        // onSelectChange={handleSelectChange}
                                        />
                                    </div>
                                </fieldset>
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <ToastNotification /> {/* Include the ToastNotification component */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleSubmit} // Confirm handler triggers form submission
                message="Are you sure you want to submit the form?"
            />
        </SideBar >
    )
}

export default Updatedhanawaktest