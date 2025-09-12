import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import ForgotPassword from "./components/Password/ForgotPassword.jsx";

import PetDashboard from './main-components/ManagePet/PetDashboard/PetDashboard.jsx';
import CreatePet from './components/ManagePet/CreatePet.jsx';


const AllRoute = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="pet-dashboard" element={<PetDashboard />} />
            <Route path="pet-dashboard/create" element={<CreatePet />} />


        </Routes>
    );
};

export default AllRoute;

// import React from 'react';
// import { BrowserRouter, Routes, Route, } from "react-router-dom";
// import HomePage from './main-components/Home/HomePage';
// import PetDashboard from './main-components/ManagePet/PetDashboard/PetDashboard.jsx';
// import PetDetails from './main-components/ManagePet/PetDetails/PetDetails.jsx';
// import Booking from 'main-components/Appointments/Booking/Booking.jsx';
// import CareCentre from 'main-components/Appointments/CareCentre/CareCentre.jsx';
// import Shop from 'main-components/Shop/Shop/Shop.jsx';
// import Cart from 'main-components/Shop/Cart/Cart.jsx';
// import Timeline from 'main-components/TrackHealth/HealthTimeline/Timeline.jsx';
// import PetProfile from 'main-components/TrackHealth/Petprofile/Petprofile.jsx'
// import MedicalDocuments from 'main-components/TrackHealth/MedicalDocuments/MedicalDocuments.jsx'
//
//
//
//
//
// const AllRoute = () => {
//
//     return (
//         <div className="App">
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="home" element={<HomePage />} />
//                     <Route path="pet-dashboard" element={<PetDashboard />} />
//                     <Route path="pet-details" element={<PetDetails />} />
//                     <Route path='booking' element={<Booking />} />
//                     <Route path='cart' element={<Cart />} />
//                     <Route path='care-centre' element={<CareCentre />} />
//                     <Route path='shop' element={<Shop />} />
//                     <Route path="timeline" element={<Timeline />} />
//                     <Route path="pet-profile" element={<PetProfile />} />
//                     <Route path="medical-documents" element={<MedicalDocuments />} />
//                 </Routes>
//             </BrowserRouter>
//
//         </div>
//     );
// }
//
// export default AllRoute;
