import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../../api/product";
import "../../assets/css/ProductDetails.css";

const DEFAULT_IMAGE = "https://via.placeholder.com/500x500?text=No+Image";

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImage, setMainImage] = useState(DEFAULT_IMAGE);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                const productData = data.product || data;
                setProduct(productData);
                if (productData.images_url && productData.images_url.length > 0) {
                    setMainImage(productData.images_url[0].url);
                }
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <p>Loading...</p>;

    const price = Number(product.price) || 0;

    // Hàm thêm vào giỏ hàng
    const handleAddToCart = () => {
        // đây là ví dụ đơn giản: bạn có thể lưu vào localStorage hoặc state toàn cục
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images_url?.[0]?.url || DEFAULT_IMAGE,
            quantity: 1
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    };

    return (
        <div className="product-details-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/">Home</Link> &gt;
                <Link to="/shop"> Shop</Link> &gt;
                <span> {product.name || "No Name"}</span>
            </div>

            <div className="product-details-container">
                {/* Ảnh chính */}
                <div className="product-images">
                    <div className="main-image">
                        <img
                            src={mainImage || DEFAULT_IMAGE}
                            alt={product.name || "Product"}
                            width="500"
                            height="500"
                            style={{ objectFit: "cover", borderRadius: "8px", cursor: "zoom-in" }}
                            onClick={() => setLightboxOpen(true)}
                        />
                    </div>

                    {/* Thumbnails slider */}
                    <div className="thumbnails-slider">
                        {product.images_url && product.images_url.length > 0
                            ? product.images_url.map((imgObj, index) => (
                                <img
                                    key={index}
                                    src={imgObj.url || DEFAULT_IMAGE}
                                    alt={`${product.name || "Product"} ${index + 1}`}
                                    className={`thumbnail ${mainImage === imgObj.url ? "active" : ""}`}
                                    width="80"
                                    height="80"
                                    onClick={() => setMainImage(imgObj.url)}
                                    style={{ objectFit: "cover", cursor: "pointer", borderRadius: "4px" }}
                                />
                            ))
                            : <img src={DEFAULT_IMAGE} alt="No Image" width="80" height="80" style={{ objectFit: "cover", borderRadius: "4px" }} />
                        }
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="product-info">
                    <h2>{product.name || "No Name"}</h2>
                    <p>{product.description || "No description available."}</p>
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                        {price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </p>

                    {/* Nút Add to Cart */}
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="lightbox" onClick={() => setLightboxOpen(false)}>
                    <img src={mainImage} alt="Zoomed" className="lightbox-image" />
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
