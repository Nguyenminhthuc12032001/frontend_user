import React from "react";
import ProductList from "../../../components/Shop/ProductList"; // import ProductList

const Shop = () => {
    return (
        <div>
            <h1 style={{
                textAlign: "center",
                color: "#8B4513", // màu nâu
                fontSize: "48px", // to hơn
                fontWeight: "bold",
                margin: "40px 0"
            }}>
                Product
            </h1>
            {/* Product list */}
            <ProductList />
        </div>
    );
};

export default Shop;
