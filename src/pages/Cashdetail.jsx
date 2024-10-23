import { react, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import SideBar from "../components/Sidebar";
const Cashdetail = () => {
  const [CashdetailData, setCashdetailData] = useState({
    cash: null,
    paddy_purchase: null,
    paddy_in: null,
    paddy_sale: null,
    paddy_processed: null,
    paddy_stacked: null,
    rice_purchase: null,
    rice_despatched: null,
    broken_sold: null,
    bran_sold: null,
    nakkhi_sold: null,
    bhusa_sold: null,
    transporting_bill: null,
    bardana: null,
    total: null,
  });
  const initialCashdetailData = {
    cash: null,
    paddy_purchase: null,
    paddy_in: null,
    paddy_sale: null,
    paddy_processed: null,
    paddy_stacked: null,
    rice_purchase: null,
    rice_despatched: null,
    broken_sold: null,
    bran_sold: null,
    nakkhi_sold: null,
    bhusa_sold: null,
    transporting_bill: null,
    bardana: null,
    total: null,
  };
  const resetForm = () => {
    setCashdetailData(initialCashdetailData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setCashdetailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiBaseUrl}/cash-in-out`,
        CashdetailData,
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Bhusi  added successfully");
        toast.success(" Cash Detail added successfully", {
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
        console.error("Failed to add  Cash Detail");
        toast.error("Failed to add Cash Detail ", {
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
      toast.error("Error adding  Cash Detail", {
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
  const notificationMethods = [
    { id: "cash_in", title: "Cash In" },
    { id: "cash_out", title: "Cash Out" },
    { id: "cash_value", title: "Cash Value" },
  ];

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
              Cash Detail
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[740px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-base font-semibold text-gray-900">
                    Cash
                  </label>
                  <fieldset className="mt-4">
                    <legend className="sr-only">Notification method</legend>
                    <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                      {notificationMethods.map((notificationMethod) => (
                        <div
                          key={notificationMethod.id}
                          className="flex items-center"
                        >
                          <input
                            id={notificationMethod.id}
                            name="notification-method"
                            type="radio"
                            defaultChecked={notificationMethod.id === "email"}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor={notificationMethod.id}
                            className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                          >
                            {notificationMethod.title}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
                <div className="flex flex-wrap justify-between">
                  <Inputbox
                    name="paddy_purchase"
                    label="Paddy Purchase"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.paddy_purchase}
                  />
                  <Inputbox
                    name="paddy_in"
                    label="Paddy In"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.paddy_in}
                  />
                </div>
                <div className="flex flex-wrap justify-between">
                  <Inputbox
                    name="paddy_sale"
                    label="Paddy Sale"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.paddy_sale}
                  />
                  <Inputbox
                    name="paddy_processed"
                    label="Paddy Processed"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.paddy_processed}
                  />
                </div>
                <div className="flex flex-wrap justify-between">
                  <Inputbox
                    name="paddy_stacked"
                    label="Paddy Stacked"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.paddy_stacked}
                  />
                  <Inputbox
                    name="rice_purchase"
                    label="Rice Purchase"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.rice_purchase}
                  />
                </div>
                <div className="flex flex-wrap justify-between">
                  <Inputbox
                    name="rice_despatched"
                    label="Rice Despatched"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.rice_despatched}
                  />
                  <Inputbox
                    name="broken_sold"
                    label="Broken Sold"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.broken_sold}
                  />
                </div>
                <div className="flex flex-wrap justify-between">
                  <Inputbox
                    name="bran_sold"
                    label="Bran Sold"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.bran_sold}
                  />
                  <Inputbox
                    name="nakkhi_sold"
                    label="Nakkhi Sold"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.nakkhi_sold}
                  />
                </div>
                <div className="flex flex-wrap justify-between">
                  <Inputbox
                    name="bhusa_sold"
                    label="Bhusa Sold"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.bhusa_sold}
                  />
                  <Inputbox
                    name="transporting_bill"
                    label="Transporting Bill"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.transporting_bill}
                  />
                </div>
                <div className="flex flex-wrap justify-between">
                  <Inputbox
                    name="bardana"
                    label="Bardana"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.bardana}
                  />
                  <Inputbox
                    name="total"
                    label="Total"
                    type="number"
                    onChange={handleInputChange}
                    value={CashdetailData.total}
                  />
                </div>
                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cash Detail
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

export default Cashdetail;
