import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import ToastNotification from "../components/ToastNotification";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmationModal from "../components/ConfirmationModal"; // Import ConfirmationModal

const ShowBrokerTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [permissions, setPermissions] = useState({ update: false, delete: false });

  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiBaseUrl}/other-broken-jawak-data/`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // console.log(response.data)
        setTransactions(response.data);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch transactions");
      }
    } catch (error) {
      toast.error("Error fetching transactions");
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
        await axios.delete(`${apiBaseUrl}/delete-broker-transaction/${selectedId}`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Broker transaction deleted successfully");
        fetchTransactions(); // Refresh the list
      } else if (currentAction === "update") {
        navigate(`/update-broker-transaction/${selectedId}`);
      }
    } catch (error) {
      toast.error("Error performing the action");
    }
    setIsModalOpen(false); // Close the modal after performing the action
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchTransactions();
      fetchPermissions(); // Fetch permissions after fetching transactions
    }
  }, [navigate]);

  return (
    <SideBar>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Broker Transactions Directory
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            A list of all the broker transactions in the system.
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
                      <th className="px-4 py-3 font-semibold">Broker</th>
                      <th className="px-4 py-3 font-semibold">Brokerage Percentage</th>
                      <th className="px-4 py-3 font-semibold">Weight</th>
                      <th className="px-4 py-3 font-semibold">Rate</th>
                      <th className="px-4 py-3 font-semibold">Number of Bags</th>
                      <th className="px-4 py-3 font-semibold">Truck Number</th>
                      <th className="px-4 py-3 font-semibold">Total</th>
                      <th className="px-4 py-3 font-semibold">Brokerage</th>
                      <th className="px-4 py-3 font-semibold">Net Receivable</th>
                      <th className="px-4 py-3 font-semibold">Loading Date</th>
                      <th className="px-4 py-3 font-semibold">Received Date</th>
                      <th className="px-4 py-3 font-semibold">Payment Received</th>
                      <th className="px-4 py-3 font-semibold">Number of Days</th>
                      <th className="px-4 py-3 font-semibold">Payment Difference</th>
                      <th className="px-4 py-3 font-semibold">Remarks</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan="18" className="text-center py-4 text-gray-600">
                          No transactions found.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction) => (
                        <tr
                          key={transaction.broken_jawak_id}
                          className="bg-white hover:bg-gray-100 transition-colors duration-150 border-t border-gray-200"
                        >
                          <td className="px-4 py-3 text-gray-800">{transaction.rst_number}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.date}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.party_name}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.rice_mill_name}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.broker}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.brokerage_percentage}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.weight}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.rate}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.number_of_bags}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.truck_number}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.total}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.brokerage}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.net_recievable}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.loading_date}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.recieved_date}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.payment_recieved}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.number_of_days}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.payment_difference}</td>
                          <td className="px-4 py-3 text-gray-800">{transaction.remarks}</td>
                          <td className="px-4 py-3">
                            {permissions.update && (
                              <button
                                onClick={() => handleUpdate(transaction.id)}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <AiOutlineEdit />
                              </button>
                            )}
                            {permissions.delete && (
                              <button
                                onClick={() => handleDelete(transaction.id)}
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
          itemName={`Broker Transaction with ID ${selectedId}`}
        />
      )}
      <ToastNotification />
    </SideBar>
  );
};

export default ShowBrokerTransactions;
