import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getAllProducts } from "../../api/product";
import { addItemsToCart } from "../../api/order"; // API thêm sản phẩm
import "../../assets/css/ProductList.css";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const [quickMainImage, setQuickMainImage] = useState("");
    const [loading, setLoading] = useState(true);
    const perPage = 8;
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                setProducts(Array.isArray(res.products) ? res.products : []);
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const totalPages = Math.ceil(products.length / perPage);
    const currentProducts = products.slice((page - 1) * perPage, page * perPage);

    const handlePrev = () => page > 1 && setPage(page - 1);
    const handleNext = () => page < totalPages && setPage(page + 1);

    const goToProductDetails = (id) => navigate(`/product-details/${id}`);

    const handleAddToCart = async (product) => {
        try {
            await addItemsToCart(product._id, quantity);
            alert(`${quantity} ${product.name} added to cart!`);
        } catch (err) {
            console.error("Error adding to cart:", err);
            alert("Error adding to cart");
        }
    };

    const openQuickView = (product) => {
        setQuickViewProduct(product);
        setQuickMainImage(product.images_url?.[0]?.url || "http://via.placeholder.com/300");
        setQuantity(1);
    };

    if (loading) return <p>Loading products...</p>;

    return (
        <div className="product-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <div className="breadcrumb">
                    <Link to="/">Home</Link> &gt;
                    <Link to="/shop">Products</Link>
                </div>

            </div>

            {/* Product List */}
            <div className="product-list">
                {currentProducts.length > 0 ? (
                    currentProducts.map((p) => (
                        <div
                            className="product"
                            key={p._id}
                            onClick={() => goToProductDetails(p._id)}
                        >
                            <div className="product-image">
                                <img src={p.images_url?.[0]?.url || "http://via.placeholder.com/200"} alt={p.name} />
                                {p.images_url?.[1] && (
                                    <img className="img2" src={p.images_url[1].url} alt={p.name} />
                                )}
                                <div
                                    className="quick-view-text"
                                    onClick={(e) => { e.stopPropagation(); openQuickView(p); }}
                                >
                                    Quick View
                                    <span className="line"></span>
                                </div>
                            </div>
                            <h3>{p.name}</h3>
                            <p className="price">{new Intl.NumberFormat().format(p.price)} $</p>
                        </div>
                    ))
                ) : <p>No products available.</p>}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button onClick={handlePrev} disabled={page === 1}>« Prev</button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={page === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={handleNext} disabled={page === totalPages}>Next »</button>
            </div>

            {/* Quick View Modal */}
            {quickViewProduct && (
                <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setQuickViewProduct(null)}>✖</button>
                        <div className="modal-content">
                            <div className="modal-left">
                                <img src={quickMainImage} alt={quickViewProduct.name} className="main-img"/>
                                <div className="thumbs">
                                    {quickViewProduct.images_url?.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img.url}
                                            alt={`thumb-${idx}`}
                                            className={quickMainImage === img.url ? "active" : ""}
                                            onClick={() => setQuickMainImage(img.url)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="modal-right">
                                <h2>{quickViewProduct.name}</h2>
                                <p className="price">{new Intl.NumberFormat().format(quickViewProduct.price)} $</p>
                                <p>{quickViewProduct.description || "No description available."}</p>

                                {/* Quantity Selector */}
                                <div className="quantity-wrapper">
                                    <button
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                        className="qty-btn"
                                    >-
                                    </button>
                                    <span className="qty-number">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        className="qty-btn"
                                    >+
                                    </button>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    className="add-cart-bottom"
                                    onClick={() => handleAddToCart(quickViewProduct)}
                                >
                                    🛒 Add to Cart
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
