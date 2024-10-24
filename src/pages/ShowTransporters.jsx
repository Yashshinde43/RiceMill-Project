import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import ToastNotification from "../components/ToastNotification";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmationModal from "../components/ConfirmationModal";

const ShowTransporters = () => {
  const [transporters, setTransporters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [permissions, setPermissions] = useState({
    update: false,
    delete: false,
  });

  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchTransporters = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiBaseUrl}/get-all-transporters`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setTransporters(response.data);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch transporters");
      }
    } catch (error) {
      toast.error("Error fetching transporters");
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
    navigate(`/update-transporter/${id}`); // Redirect to update page
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
        await axios.delete(`${apiBaseUrl}/delete-transporter/${selectedId}`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Transporter deleted successfully");
        fetchTransporters(); // Refresh the list
      }
    } catch (error) {
      toast.error("Error performing the action");
    }
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   } else {
  //     fetchTransporters();
  //     fetchPermissions(); // Fetch permissions after fetching transporters
  //   }
  // }, [navigate]);

  return (
    <SideBar>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Transporters Directory
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            A list of all the transporters in the system including their name
            and phone number.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-indigo-600 text-3xl" />
                <p className="ml-4 text-indigo-600">Loading transporters...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="px-4 py-3 font-semibold">
                        Transporter Name
                      </th>
                      <th className="px-4 py-3 font-semibold">Phone Number</th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transporters.length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-4 text-gray-600"
                        >
                          No transporters found.
                        </td>
                      </tr>
                    ) : (
                      transporters.map((transporter) => (
                        <tr
                          key={transporter.transporter_id}
                          className="bg-white hover:bg-gray-100 transition-colors duration-150 border-t border-gray-200"
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {transporter.transporter_name}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {transporter.transporter_phone_number}
                          </td>
                          <td className="px-4 py-3 text-gray-600 flex space-x-2">
                            {permissions.update && (
                              <button
                                onClick={() =>
                                  handleUpdate(transporter.transporter_id)
                                }
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <AiOutlineEdit size={20} />
                              </button>
                            )}
                            {permissions.delete && (
                              <button
                                onClick={() =>
                                  handleDelete(transporter.transporter_id)
                                }
                                className="text-red-600 hover:text-red-800"
                              >
                                <AiOutlineDelete size={20} />
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
      <ToastNotification />
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={performAction}
        message={
          currentAction === "delete"
            ? "Are you sure you want to delete this transporter?"
            : "Are you sure you want to update this transporter?"
        }
      />
    </SideBar>
  );
};

export default ShowTransporters;
