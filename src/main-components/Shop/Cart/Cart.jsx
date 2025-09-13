import React, { useEffect, useState } from "react";
import { getCurrentCartOrderByUser, createOrder } from "../../../api/order";

const Cart = () => {
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await getCurrentCartOrderByUser();
                console.log("Fetched order:", data);
                setOrder(data.order);
                setItems(data.order_items || []);
            } catch (err) {
                console.error(err.response?.data || err.message);
                setError("Failed to fetch order");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, []);

    const handleCreateOrder = async () => {
        const newOrder = {
            user_id: "68c3bf1c52fb228b8e5dae45",
            total_amount: 0,
            status: "cart",
            isDeleted: false,
        };

        try {
            const data = await createOrder({ order: newOrder });
            if (data.order?._id) {
                alert(`Order created with ID: ${data.order._id}`);
                setOrder(data.order);
                setItems([]);
            } else {
                alert("Failed to create order");
            }
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Failed to create order");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!order) return (
        <div>
            <p>No order found</p>
            <button onClick={handleCreateOrder}>Create New Order</button>
        </div>
    );

    return (
        <div style={{ maxWidth: "700px", margin: "20px auto", padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.user_id.name} ({order.user_id.email})</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total Amount:</strong> ${order.total_amount}</p>
            <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>

            <h3>Items</h3>
            {items.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={{ borderBottom: "1px solid #ccc" }}>Name</th>
                        <th style={{ borderBottom: "1px solid #ccc" }}>Category</th>
                        <th style={{ borderBottom: "1px solid #ccc" }}>Price</th>
                        <th style={{ borderBottom: "1px solid #ccc" }}>Quantity</th>
                        <th style={{ borderBottom: "1px solid #ccc" }}>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.product_id.name}</td>
                            <td>{item.product_id.category}</td>
                            <td>${item.product_id.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.product_id.price * item.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No items in this order.</p>
            )}

            <button
                onClick={handleCreateOrder}
                style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
            >
                Create New Order
            </button>
        </div>
    );
};

export default Cart;
