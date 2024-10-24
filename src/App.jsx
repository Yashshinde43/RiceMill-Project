import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Addricemill from "./pages/Addricemill";
import AddUser from "./pages/AddUser";
import AddRole from "./pages/AddRole";
import ShowRiceMills from "./pages/Showricemill";
import UpdateRiceMill from "./pages/Updatericemill";
import AwakOption from "./components/AwakOption";
import AddDhanAwak from "./pages/Dhanawak";
import PermissionsManagement from "./pages/Permision";
import NoPermission from "./pages/NoPermission"; // Import the NoPermission component
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute component
import Add_New_Transporter from "./pages/Transporter";
import Add_New_Truck from "./pages/Addtruck";
import AddNewSociety from "./pages/Addsociety";
import Add_Agreement from "./pages/Addagrement";
import Add_Warehouse from "./pages/Addwarehouse";
import Kochia from "./pages/Addkochia";
import AddParty from "./pages/AddParty";
import Add_Broker from "./pages/AddBroker";
import Add_Do from "./pages/AddDo";
import ShowTransporters from "./pages/ShowTransporters";
import UpdateTransporter from "./pages/UpdateTransporter";
import ShowTrucks from "./pages/ShowTrucks";
import Update_Truck from "./pages/Updatetruck";
import ShowSocieties from "./pages/Showsociety";
import UpdateSociety from "./pages/Updatesociety";
import ShowAgreements from "./pages/Showagrement";
import ShowWarehouses from "./pages/Showwarehouse";
import ShowKochia from "./pages/Showkochia";
import ShowParty from "./pages/Showparty";
import ShowBrokers from "./pages/Showbroker";
import ShowDo from "./pages/Showdo";
import Update_Agreement from "./pages/Updateagrement";
import UpdateWarehouse from "./pages/Updatewarehouse";
import UpdateKochia from "./pages/Updatekochia";
import UpdateParty from "./pages/UpdateParty";
import UpdateBroker from "./pages/UpdateBroker";
import UpdateDo from "./pages/UpdateDo";
import Otherawak from "./pages/Otherawak";
import ShowDhanAwak from "./pages/Showdhanawak";
import ShowOtherAwak from "./pages/Showotherawak";
import UpdateDhanAwak from "./pages/Updatedhanawak";
import UpdateOtherawak from "./pages/Updateother";
import Otherjawak from "./pages/OtherJawak";
import Brokenjawak from "./pages/Brokenjawak";
import Huskjawak from "./pages/Huskjawak";
import Nakkhijawak from "./pages/Nakkhijawak";
import Branjawak from "./pages/Branjawak";
import Bhusi from "./pages/Bhusi";
import ShowOtherJawak from "./pages/Showotherjawak";
import ShowBrokenJawak from "./pages/Showbrokenjawak";
import Showhuskjawak from "./pages/Showhuskjawak";
import Shownakkhijawak from "./pages/Shownakkhijawak";
import Showbranjawak from "./pages/Showbranjawak";
import ShowBhusiJawak from "./pages/Showbhushijawak";
// import Updatedhanawaktest from './pages/updatedhanawaktest';
import Cashdetail from "./pages/Cashdetail";
import Ricepurchased from "./components/Ricepurchased";
import Dalalidhan from "./pages/Dalalidhan";
import Ricedeposit from "./pages/Ricedeposit";
import Frk from "./pages/Frk";
import SudaPatrak from "./pages/SudaPatrak";
import DoPanding from "./pages/DoPanding";
import Dhantransporting from "./pages/Dhantransporting";
import Paddysales from "./pages/Paddysales";
import Lotnumbermaster from "./pages/Lotnumbermaster";
import Dhanricesocietiesrate from "./pages/Dhanricesocietiesrate";
import Transportermaster from "./pages/Transportermaster";
import Mohanfoodpaddy from "./pages/Mohanfoodpaddy";

const App = () => {
  const [isRoleLoaded, setIsRoleLoaded] = useState(false);

  useEffect(() => {
    // Ensure the role is loaded before rendering
    const role = localStorage.getItem("role");
    if (role) {
      setIsRoleLoaded(true);
    } else {
      // Handle case where role is not found
      setIsRoleLoaded(true); // Set to true to not block rendering
    }
  }, []);
  if (!isRoleLoaded) {
    return <div>Loading...</div>; // Show a loading state while checking the role
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-rice-mill" element={<Addricemill />} />
        <Route path="/add-role" element={<AddRole />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/show-rice-mill-data" element={<ShowRiceMills />} />
        <Route path="/update-rice-mill/:id" element={<UpdateRiceMill />} />
        <Route path="/awakoption" element={<AwakOption />} />
        <Route path="/dhanawak" element={<AddDhanAwak />} />
        <Route path="/otherawak" element={<Otherawak />} />
        <Route path="/no-permission" element={<NoPermission />} />{" "}
        {/* New route for no permission */}
        <Route
          path="/permision"
          element={
            <ProtectedRoute
              element={<PermissionsManagement />}
              allowedRole="admin"
            />
          }
        />
        <Route path="*" element={<NoPermission />} />{" "}
        {/* Handle undefined routes */}
        <Route path="/add-transporter" element={<Add_New_Transporter />} />
        <Route path="/add-truck" element={<Add_New_Truck />} />
        <Route path="/add-society" element={<AddNewSociety />} />
        <Route path="/add-agrement" element={<Add_Agreement />} />
        <Route path="/add-warehouse" element={<Add_Warehouse />} />
        <Route path="/add-kochia" element={<Kochia />} />
        <Route path="/add-party" element={<AddParty />} />
        <Route path="/add-broker" element={<Add_Broker />} />
        <Route path="/add-do" element={<Add_Do />} />
        <Route path="/show-transporter" element={<ShowTransporters />} />
        <Route path="/show-agreements" element={<ShowAgreements />} />
        <Route path="/show-warehouse" element={<ShowWarehouses />} />
        <Route path="/show-kochia" element={<ShowKochia />} />
        <Route path="/show-party" element={<ShowParty />} />
        <Route path="/show-broker" element={<ShowBrokers />} />
        <Route path="/show-do" element={<ShowDo />} />
        <Route path="/show-truck" element={<ShowTrucks />} />
        <Route path="/show-society" element={<ShowSocieties />} />
        <Route path="/show-dhan-awak" element={<ShowDhanAwak />} />
        <Route path="/show-other-awak" element={<ShowOtherAwak />} />
        <Route path="/show-other-jawak" element={<ShowOtherJawak />} />
        <Route path="/show-broken-jawak" element={<ShowBrokenJawak />} />
        <Route path="/show-husk-jawak" element={<Showhuskjawak />} />
        <Route path="/show-nakkhi-jawak" element={<Shownakkhijawak />} />
        <Route path="/show-bran-jawak" element={<Showbranjawak />} />
        <Route path="/show-bhushi-jawak" element={<ShowBhusiJawak />} />
        <Route path="/other-jawak" element={<Otherjawak />} />
        <Route path="/broken-jawak" element={<Brokenjawak />} />
        <Route path="/husk-jawak" element={<Huskjawak />} />
        <Route path="/nakkhi-jawak" element={<Nakkhijawak />} />
        <Route path="/bran-jawak" element={<Branjawak />} />
        <Route path="/bhusi" element={<Bhusi />} />
        <Route path="/update-transporter/:id" element={<UpdateTransporter />} />
        <Route path="/update-truck/:id" element={<Update_Truck />} />
        <Route path="/update-society/:id" element={<UpdateSociety />} />
        <Route path="/update-agrement/:id" element={<Update_Agreement />} />
        <Route path="/update-warehouse/:id" element={<UpdateWarehouse />} />
        <Route path="/update-kochia/:id" element={<UpdateKochia />} />
        <Route path="/update-party/:id" element={<UpdateParty />} />
        <Route path="/update-broker/:id" element={<UpdateBroker />} />
        <Route path="/update-do/:id" element={<UpdateDo />} />
        <Route path="/update-dhan-awak/:id" element={<UpdateDhanAwak />} />
        {/* <Route path="/Updatedhanawaktest/:id" element={<Updatedhanawaktest/>} /> */}
        <Route path="/update-other-awak/:id" element={<UpdateOtherawak />} />
        <Route path="/cashdetail" element={<Cashdetail />} />
        <Route path="/ricepurchased" element={<Ricepurchased />} />
        <Route path="/dalalidhan" element={<Dalalidhan />} />
        <Route path="/ricedeposit" element={<Ricedeposit />} />
        <Route path="/frk" element={<Frk />} />
        <Route path="/sudapatrak" element={<SudaPatrak />} />
        <Route path="/dopanding" element={<DoPanding />} />
        <Route path="/dalalidhan" element={<Dalalidhan />} />
        <Route path="/dhantransporting" element={<Dhantransporting />} />
        <Route path="/paddysales" element={<Paddysales />} />
        <Route path="/lotnumbermaster" element={<Lotnumbermaster />} />
        <Route
          path="/dhanricesocietiesrate"
          element={<Dhanricesocietiesrate />}
        />
        <Route path="/transportermaster" element={<Transportermaster />} />
        <Route path="/mohanfoodpaddy" element={<Mohanfoodpaddy />} />
      </Routes>
    </Router>
  );
};
export default App;
