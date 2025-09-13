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
import HomePage from "./main-components/Home/HomePage.jsx"
import Cart from "./main-components/Shop/Cart/Cart.jsx";
import MainLayout from './layouts/MainLayout.jsx'; // layout mới
import PrivateRoute from './components/Auth/PrivateRoute.jsx'; // import component

const AllRoute = () => {
    return (
        <Routes>
            {/* Routes KHÔNG có Header */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="success" element={<Success />} />
            <Route path="email-verified" element={<EmailVerifiedSuccess/>}/>
            <Route path="cart" element={<Cart/>}/>


            {/* Routes có Header (main-components) */}
            <Route element={<MainLayout />}>
                <Route element={<PrivateRoute />} />
                <Route path="/" element={<HomePage />} />
                <Route path="home" element={<HomePage/>}/>
                <Route path="pet-dashboard" element={<PetDashboard />} />
                <Route path="pet-dashboard/create" element={<CreatePet />} />
                <Route path="pet-dashboard/edit/:id" element={<EditPet />} />
                <Route path="pet-dashboard/delete/:id" element={<DeletePet />} />
                <Route path="pet-details/:id" element={<PetDetails />} />
                <Route path="shop" element={<Shop />} />
                <Route path="product-list" element={<ProductList />} />
                <Route path="product-details/:id" element={<ProductDetails />} />
            </Route>
        </Routes>
    );
};

export default AllRoute;
