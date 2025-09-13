import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentCartOrderByUser, createOrder } from "../../../api/order";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Lấy giỏ hàng hiện tại
    const fetchCart = async () => {
        try {
            const data = await getCurrentCartOrderByUser(); // API của bạn
            setCartItems(data.items || []);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Xoá sản phẩm khỏi giỏ hàng
    const handleRemove = (product_id) => {
        setCartItems(cartItems.filter(item => item.product_id !== product_id));
    };

    // Tính tổng tiền
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price_each * item.quantity;
        }, 0);
    };

    // Đặt hàng
    const handleCheckout = async () => {
        if (cartItems.length === 0) return alert("Giỏ hàng trống!");

        const orderData = {
            user_id: localStorage.getItem("user_id"),
            total_amount: calculateTotal(),
            items: cartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price_each: item.price_each
            }))
        };

        try {
            await createOrder(orderData);
            alert("Đặt hàng thành công!");
            navigate("/success"); // chuyển tới trang thành công
        } catch (error) {
            console.error(error);
            alert("Đặt hàng thất bại, thử lại sau.");
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="cart-container">
            <h2>Giỏ hàng của bạn</h2>
            {cartItems.length === 0 ? (
                <p>Giỏ hàng trống.</p>
            ) : (
                <table className="cart-table">
                    <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Số lượng</th>
                        <th>Tổng</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product_name || item.product_id}</td>
                            <td>{item.price_each.toLocaleString()} đ</td>
                            <td>{item.quantity}</td>
                            <td>{(item.price_each * item.quantity).toLocaleString()} đ</td>
                            <td>
                                <button onClick={() => handleRemove(item.product_id)}>
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <h3>Tổng cộng: {calculateTotal().toLocaleString()} đ</h3>
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Thanh toán
                    </button>
                </div>
            )}
        </div>
    );
};

export default Cart;
