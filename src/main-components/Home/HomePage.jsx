import React from "react";


const HomePage = () => {
    return (
        <div className="font-sans text-gray-900">
            {/* Header */}
            <header className="bg-black text-white p-4 flex justify-between items-center">
                <div className="text-2xl font-bold">YourBrand</div>
                <nav className="space-x-6 hidden md:flex">
                    <a href="#home" className="hover:text-yellow-500">Home</a>
                    <a href="#products" className="hover:text-yellow-500">Products</a>
                    <a href="#about" className="hover:text-yellow-500">About</a>
                    <a href="#contact" className="hover:text-yellow-500">Contact</a>
                </nav>
                <div className="space-x-4">
                    <button className="bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400">Login</button>
                    <button className="border border-yellow-500 px-4 py-1 rounded hover:bg-yellow-500 hover:text-white">Sign Up</button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative">
                <img src={HeroImage} alt="Hero" className="w-full h-[80vh] object-cover"/>
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                    <h1 className="text-5xl font-bold mb-4">Welcome to YourBrand</h1>
                    <p className="text-xl mb-6">Luxury meets sophistication</p>
                    <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg hover:bg-yellow-400">
                        Explore Now
                    </button>
                </div>
            </section>

            {/* Featured Products */}
            <section id="products" className="py-16 bg-gray-50 text-center">
                <h2 className="text-4xl font-bold mb-12">Featured Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {[Product1, Product2, Product3].map((img, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
                            <img src={img} alt={`Product ${idx+1}`} className="w-full h-64 object-cover"/>
                            <div className="p-4">
                                <h3 className="font-bold text-xl mb-2">Product {idx+1}</h3>
                                <p className="text-gray-600">Luxury, premium quality item.</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 max-w-5xl mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-6">About Us</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                    YourBrand is dedicated to bringing you the finest and most luxurious products. Our commitment to excellence is reflected in every detail.
                </p>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-100 text-center">
                <h2 className="text-4xl font-bold mb-12">What Our Customers Say</h2>
                <div className="max-w-4xl mx-auto space-y-8">
                    {["Amazing quality!", "Exceptional service!", "Highly recommend!"].map((text, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="italic text-gray-700">"{text}"</p>
                            <span className="block mt-4 font-bold">- Customer {idx+1}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section id="contact" className="py-16 bg-black text-white text-center">
                <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
                <p className="mb-6">Subscribe to our newsletter for latest updates and offers.</p>
                <form className="flex flex-col md:flex-row justify-center gap-4 max-w-xl mx-auto">
                    <input type="email" placeholder="Enter your email" className="p-3 rounded-lg flex-1 text-black"/>
                    <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg hover:bg-yellow-400">Subscribe</button>
                </form>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 p-8 text-center">
                <p>&copy; 2025 YourBrand. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
