// src/layouts/MainLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

// Header
import Header from '../components/header/header.jsx';

// Main-components pages

import PetDashboard from '../main-components/ManagePet/PetDashboard/PetDashboard.jsx';
import PetDetails from '../main-components/ManagePet/PetDetails/PetDetails.jsx';
import Shop from '../main-components/Shop/Shop/Shop.jsx';
import ProductList from '../components/Shop/ProductList.jsx';
import ProductDetails from '../components/Shop/ProductDetails.jsx';
import Home from '../main-components/Home/HomePage.jsx';

// Footer
const Footer = () => {
    return (
        <footer style={{
            backgroundColor: "#8B4513",
            color: "#fff",
            padding: "20px",
            textAlign: "center"
        }}>
            <p>&copy; 2025 PetCare. All rights reserved.</p>
            <div>
                <a href="#" style={{ color: "#FFD700", margin: "0 10px" }}>Facebook</a>
                <a href="#" style={{ color: "#FFD700", margin: "0 10px" }}>Instagram</a>
                <a href="#" style={{ color: "#FFD700", margin: "0 10px" }}>Twitter</a>
            </div>
        </footer>
    );
};

const MainLayout = () => {
    return (
        <>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                <Outlet /> {/* Render các trang con */}
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
