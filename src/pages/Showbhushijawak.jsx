import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import SideBar from "../components/Sidebar";
import ConfirmationModal from "../components/ConfirmationModal";
import ToastNotification from "../components/ToastNotification"; // Import the ToastNotification component
import { FaSpinner } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ShowBhusiJawak = () => {
  const [bhusiTransactions, setBhusiTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [permissions, setPermissions] = useState({ update: false, delete: false });

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchBhusiTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiBaseUrl}/other-bhushi-data/`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log(response.data)
        setBhusiTransactions(response.data);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch Bhusi Jawak transactions");
      }
    } catch (error) {
      toast.error("Error fetching Bhusi Jawak transactions");
      setIsLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      const roleName = localStorage.getItem("role");

      // Admins should have all permissions
      if (roleName === "admin") {
        setPermissions({ update: true, delete: true });
        return;
      }

      const response = await axios.get(`${apiBaseUrl}/roles-and-permissions`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const userPermissions = response.data.permissions[roleName];
        setPermissions(userPermissions || { update: false, delete: false });
      } else {
        toast.error("Failed to fetch permissions");
      }
    } catch (error) {
      toast.error("Error fetching permissions");
    }
  };

  const handleUpdate = (id) => {
    setSelectedId(id);
    setCurrentAction("update");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setCurrentAction("delete");
    setIsModalOpen(true);
  };

  const performAction = async () => {
    try {
      const token = localStorage.getItem("token");
      if (currentAction === "delete") {
        await axios.delete(`${apiBaseUrl}/delete-bhusi-transaction/${selectedId}`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Bhusi transaction deleted successfully");
        fetchBhusiTransactions(); // Refresh the list
      } else if (currentAction === "update") {
        // Implement the navigation to update page
        navigate(`/update-bhusi-transaction/${selectedId}`);
      }
    } catch (error) {
      toast.error("Error performing the action");
    }
    setIsModalOpen(false); // Close the modal after performing the action
  };

  useEffect(() => {
    fetchBhusiTransactions();
    fetchPermissions(); // Fetch permissions after fetching transactions
  }, []);

  return (
    <SideBar>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bhusi Jawak 
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            A list of all the Bhusi Jawak transactions in the system.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-indigo-600 text-3xl" />
                <p className="ml-4 text-indigo-600">Loading transactions...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="px-4 py-3 font-semibold">RST Number</th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">Party Name</th>
                      <th className="px-4 py-3 font-semibold">Rice Mill Name </th>
                      <th className="px-4 py-3 font-semibold">Truck Number</th>
                      <th className="px-4 py-3 font-semibold">Weight</th>
                      <th className="px-4 py-3 font-semibold">Rate</th>
                      <th className="px-4 py-3 font-semibold">Total Amount</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bhusiTransactions.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="text-center py-4 text-gray-600">
                          No Bhusi Jawak transactions found.
                        </td>
                      </tr>
                    ) : (
                      bhusiTransactions.map((transaction) => (
                        <tr
                          key={transaction.bhushi_id}
                          className="bg-white hover:bg-gray-100 transition-colors duration-150 border-t border-gray-200"
                        >
                          <td className="px-4 py-3 text-gray-800">{transaction.rst_number}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.date}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.party_name}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.rice_mill_name}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.truck_number}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.weight}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.rate}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.amount}</td>
                          <td className="px-4 py-3">
                            {permissions.update && (
                              <button
                                onClick={() => handleUpdate(transaction.bhusi_jawak_id)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <AiOutlineEdit />
                              </button>
                            )}
                            {permissions.delete && (
                              <button
                                onClick={() => handleDelete(transaction.bhusi_jawak_id)}
                                className="text-red-600 hover:text-red-900 ml-4"
                              >
                                <AiOutlineDelete />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={performAction}
          action={currentAction}
          itemName={`Bhusi Jawak transaction with ID ${selectedId}`}
        />
      )}
      <ToastNotification />
    </SideBar>
  );
};

export default ShowBhusiJawak;
