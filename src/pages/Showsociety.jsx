import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import ToastNotification from "../components/ToastNotification";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmationModal from "../components/ConfirmationModal"; // Import ConfirmationModal

const ShowSocieties = () => {
  const [societies, setSocieties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [currentAction, setCurrentAction] = useState(null); // To hold the current action and ID
  const [selectedId, setSelectedId] = useState(null); // To hold the selected ID
  const [permissions, setPermissions] = useState({
    update: false,
    delete: false,
  }); // State for permissions

  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchSocieties = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiBaseUrl}/get-all-societies`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setSocieties(response.data);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch societies");
      }
    } catch (error) {
      toast.error("Error fetching societies");
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
        await axios.delete(`${apiBaseUrl}/delete-society/${selectedId}`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Society deleted successfully");
        fetchSocieties(); // Refresh the list
      } else if (currentAction === "update") {
        navigate(`/update-society/${selectedId}`);
      }
    } catch (error) {
      toast.error("Error performing the action");
    }
    setIsModalOpen(false); // Close the modal after performing the action
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   } else {
  //     fetchSocieties();
  //     fetchPermissions(); // Fetch permissions after fetching societies
  //   }
  // }, [navigate]);

  return (
    <SideBar>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Societies Directory
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            A list of all the societies including their name, distance from
            mill, and transporting rate.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-indigo-600 text-3xl" />
                <p className="ml-4 text-indigo-600">Loading societies...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="px-4 py-3 font-semibold">Society Name</th>
                      <th className="px-4 py-3 font-semibold">
                        Distance From Mill
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Google Distance
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Transporting Rate
                      </th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {societies.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center py-4 text-gray-600"
                        >
                          No societies found.
                        </td>
                      </tr>
                    ) : (
                      societies.map((society) => (
                        <tr
                          key={society.society_id}
                          className="bg-white hover:bg-gray-100 transition-colors duration-150 border-t border-gray-200"
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {society.society_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {society.distance_from_mill}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {society.google_distance}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {society.transporting_rate}
                          </td>
                          <td className="px-4 py-3 text-gray-600 flex space-x-2">
                            {permissions.update && (
                              <button
                                onClick={() => handleUpdate(society.society_id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <AiOutlineEdit size={20} />
                              </button>
                            )}
                            {permissions.delete && (
                              <button
                                onClick={() => handleDelete(society.society_id)}
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
            ? "Are you sure you want to delete this society?"
            : "Are you sure you want to update this society?"
        }
      />
    </SideBar>
  );
};

export default ShowSocieties;
