import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar";

const PermissionsManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${apiBaseUrl}/roles-and-permissions`, {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        });
        setRoles(response.data.roles);
        setPermissions(response.data.permissions);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching roles and permissions");
        setIsLoading(false);
      }
    };
    fetchRolesAndPermissions();
  }, [apiBaseUrl, apiKey, navigate]);

  const handlePermissionChange = (roleName, action, value) => {
    setPermissions((prev) => ({
      ...prev,
      [roleName]: {
        ...prev[roleName],
        [action]: value,
      },
    }));
  };

  const savePermissions = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${apiBaseUrl}/update-permissions`,
        { permissions },
        {
          headers: {
            "api-key": apiKey,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Permissions updated successfully");
    } catch (error) {
      toast.error("Error updating permissions");
    }
  };

  return (
    <SideBar>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Manage Permissions
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
          <div className="bg-white py-8 px-6 shadow-md rounded-lg sm:px-10">
            {isLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div>
                <table className="min-w-full text-left table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-indigo-600 text-white">
                      <th className="px-4 py-3 font-semibold">Role</th>
                      <th className="px-4 py-3 font-semibold">Update</th>
                      <th className="px-4 py-3 font-semibold">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role, index) => (
                      <tr
                        key={role} // Use role name directly for the key
                        className="bg-white hover:bg-gray-100 transition-colors duration-150 border-t border-gray-200"
                      >
                        <td className="px-4 py-3 text-gray-800">{role}</td>
                        <td className="px-4 py-3 text-gray-600">
                          <input
                            type="checkbox"
                            checked={permissions[role]?.update || false}
                            onChange={(e) => handlePermissionChange(role, 'update', e.target.checked)}
                          />
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          <input
                            type="checkbox"
                            checked={permissions[role]?.delete || false}
                            onChange={(e) => handlePermissionChange(role, 'delete', e.target.checked)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right">
                  <button
                    onClick={savePermissions}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default PermissionsManagement;
