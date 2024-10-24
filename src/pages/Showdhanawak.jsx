import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";
import ToastNotification from "../components/ToastNotification";
import { FaSpinner } from "react-icons/fa";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ConfirmationModal from "../components/ConfirmationModal"; // Import ConfirmationModal

const ShowDhanAwak = () => {
  const [riceMills, setRiceMills] = useState([]);
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

  const fetchRiceMills = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiBaseUrl}/dhan-awak-data/`, {
        headers: {
          "api-key": apiKey,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setRiceMills(response.data);
        setIsLoading(false);
      } else {
        toast.error("Failed to fetch rice mills");
      }
    } catch (error) {
      toast.error("Error fetching rice mills");
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

      console.log("Response data:", response.data);

      if (response.status === 200) {
        const userPermissions = response.data.permissions[roleName];
        console.log("User permissions for role:", roleName, userPermissions);

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
        await axios.delete(`${apiBaseUrl}/delete-rice-mill/${selectedId}`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Rice mill deleted successfully");
        fetchRiceMills(); // Refresh the list
      } else if (currentAction === "update") {
        navigate(`/updatedhanawaktest/${selectedId}`);
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
  //     fetchRiceMills();
  //     fetchPermissions(); // Fetch permissions after fetching rice mills
  //   }
  // }, [navigate]);

  return (
    <SideBar>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Rice Mills Directory
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            A list of all the rice mills in the system including their GST
            number, name, address, phone number, and capacity.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-indigo-600 text-3xl" />
                <p className="ml-4 text-indigo-600">Loading rice mills...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="px-4 py-3 font-semibold">Rst Number</th>
                      <th className="px-4 py-3 font-semibold">
                        Rice Mill Name
                      </th>
                      <th className="px-4 py-3 font-semibold">Date</th>
                      <th className="px-4 py-3 font-semibold">DO Number</th>
                      <th className="px-4 py-3 font-semibold">Society Id</th>
                      <th className="px-4 py-3 font-semibold">DM Weight</th>
                      <th className="px-4 py-3 font-semibold">
                        Number of Bags
                      </th>
                      <th className="px-4 py-3 font-semibold">Truck Number</th>
                      <th className="px-4 py-3 font-semibold">
                        Transporter Name
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Transporting Rate
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Transporting Total
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Jama Jute 22-23
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Ek Bharti 21-22
                      </th>
                      <th className="px-4 py-3 font-semibold">PDS</th>
                      <th className="px-4 py-3 font-semibold">Miller Purana</th>
                      <th className="px-4 py-3 font-semibold">Kisan</th>
                      <th className="px-4 py-3 font-semibold">
                        Bardana Society
                      </th>
                      <th className="px-4 py-3 font-semibold">HDPE 22-23</th>
                      <th className="px-4 py-3 font-semibold">HDPE 21-23</th>
                      <th className="px-4 py-3 font-semibold">
                        HDPE 21-22 Oue Use
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Total Bag Weight
                      </th>
                      <th className="px-4 py-3 font-semibold">Type of Paddy</th>
                      <th className="px-4 py-3 font-semibold">Actual Paddy</th>
                      <th className="px-4 py-3 font-semibold">
                        Mill weight Quintals
                      </th>
                      <th className="px-4 py-3 font-semibold">Shortage</th>
                      <th className="px-4 py-3 font-semibold">
                        Bags Put In Hopper
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Hopper rice mill
                      </th>
                      <th className="px-4 py-3 font-semibold">
                        Stack Location
                      </th>
                      <th className="px-4 py-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riceMills.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center py-4 text-gray-600"
                        >
                          No rice mills found.
                        </td>
                      </tr>
                    ) : (
                      riceMills.map((mill) => (
                        <tr
                          key={mill.dhan_awak_id}
                          className="bg-white hover:bg-gray-100 transition-colors duration-150 border-t border-gray-200"
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {mill.rst_number}
                          </td>
                          <td className="py-2 px-4 border-b subpixel-antialiased leading-6 text-gray-900">
                            {mill.rice_mill_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.date}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.do_number}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.society_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.dm_weight}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.number_of_bags}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.truck_number}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.transporter_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.transporting_rate}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.transporting_total}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.jama_jute_22_23}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.ek_bharti_21_22}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.pds}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.miller_purana}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.kisan}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.bardana_society}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.hdpe_22_23}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.hdpe_21_22}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.hdpe_21_22_one_use}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.total_bag_weight}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.type_of_paddy}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.actual_paddy}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.mill_weight_quintals}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.shortage}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.bags_put_in_hopper}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.hopper_rice_mill_id}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {mill.stack_location}
                          </td>
                          <td className="px-4 py-3 text-gray-600 flex space-x-2">
                            {permissions.update && (
                              <button
                                onClick={() => handleUpdate(mill.rice_mill_id)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <AiOutlineEdit size={20} />
                              </button>
                            )}
                            {permissions.delete && (
                              <button
                                onClick={() => handleDelete(mill.rice_mill_id)}
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
            ? "Are you sure you want to delete this rice mill?"
            : "Are you sure you want to update this rice mill?"
        }
      />
    </SideBar>
  );
};

export default ShowDhanAwak;
