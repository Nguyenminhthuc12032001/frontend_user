import React from 'react';
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import ForgotPassword from "./components/Password/ForgotPassword.jsx";
import CreatePet from './components/ManagePet/CreatePet.jsx';
import EditPet from './components/ManagePet/EditPet.jsx';
import DeletePet from './components/ManagePet/DeletePet.jsx';
import PetDashboard from './main-components/ManagePet/PetDashboard/PetDashboard.jsx';
import PetDetails from "./main-components/ManagePet/PetDetails/PetDetails.jsx";
import Shop from 'main-components/Shop/Shop/Shop.jsx';
import ProductList from "./components/Shop/ProductList.jsx";
import ProductDetails from "./components/Shop/ProductDetails.jsx";
import Success from "./components/SuccessPage/Success.jsx";
import EmailVerifiedSuccess from "./components/Email/EmailVerifiedSuccess.jsx";
import HomePage from "./main-components/Home/HomePage.jsx";
import Cart from "./main-components/Shop/Cart/Cart.jsx";
import MainLayout from './layouts/MainLayout.jsx';
import PrivateRoute from './components/Auth/PrivateRoute.jsx';
import Dashboard from './components/TracKHealth/Dashboard/Dashboard.jsx';
import Documents from './components/TrackHealth/Documents/Documents.jsx';
import CreateHealthRecord from './components/TracKHealth/CreateHealthRecord.jsx';

const App = () => {
    return (
        <Routes>
            {/* Public routes (không cần login) */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="success" element={<Success />} />
            <Route path="email-verified" element={<EmailVerifiedSuccess />} />
            <Route path="cart" element={<Cart />} />

            {/* Private routes (cần login) */}
            <Route element={<MainLayout />}>
                <Route element={<PrivateRoute />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="pet-dashboard" element={<PetDashboard />} />
                    <Route path="pet-dashboard/create" element={<CreatePet />} />
                    <Route path="pet-dashboard/edit/:id" element={<EditPet />} />
                    <Route path="pet-dashboard/delete/:id" element={<DeletePet />} />
                    <Route path="pet-details/:id" element={<PetDetails />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="product-list" element={<ProductList />} />
                    <Route path="product-details/:id" element={<ProductDetails />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="trackhealth-documents" element={<Documents />} />
                    <Route path="dashboard-create" element={<CreateHealthRecord />}/>
                </Route>
            </Route>
        </Routes>
    );
};

export default App;
