import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { getTotalItems } from '../../api/order';

const Header = () => {
    const [searchActive, setSearchActive] = useState(false);
    const [placeholderText, setPlaceholderText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const location = useLocation();

    const texts = ["Find your pet", "What product you want to buy"];


    const ClickHandler = () => window.scrollTo(10, 0);

    // Fetch total items
    useEffect(() => {
        const fetchTotalItems = async () => {
            try {
                const total = await getTotalItems();
                setTotalItems(total);
            } catch (err) {
                console.error("Error fetching total items:", err);
            }
        };
        fetchTotalItems();
    }, []);

    // Typing effect for search placeholder
    useEffect(() => {
        if (!searchActive) {
            setPlaceholderText("");
            setCharIndex(0);
            setDeleting(false);
            return;
        }

        const typingSpeed = 100;
        const deletingSpeed = 50;

        const timeout = setTimeout(() => {
            const currentText = texts[textIndex];
            if (!deleting) {
                setPlaceholderText(currentText.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
                if (charIndex + 1 === currentText.length) setDeleting(true);
            } else {
                setPlaceholderText(currentText.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
                if (charIndex - 1 === 0) {
                    setDeleting(false);
                    setTextIndex((textIndex + 1) % texts.length);
                }
            }
        }, deleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, deleting, searchActive, textIndex]);

    return (
        <header className="shadow-md sticky top-0 z-50 bg-[#fdf4eb]">
            <div className="flex items-center justify-between px-12 py-3">
                {/* Logo */}
                <Link to="/" className="flex-shrink-0">
                    <img src={Logo} alt="logo" className="h-12" />
                </Link>

                {/* Menu */}
                <nav className="flex-1 text-center">
                    <ul className="flex justify-center items-center space-x-6 font-medium text-[#5b3920]">
                        <li><Link to="/home" className="px-3 py-1 hover:text-[#7b4f2e] transition">Home</Link></li>
                        <li><Link to="/pet-dashboard" className="px-3 py-1 hover:text-[#7b4f2e] transition">Manage pet
                            profiles</Link></li>
                        <li className="group relative">
                            <span className="px-3 py-1 hover:text-[#7b4f2e] transition cursor-pointer">Track health records</span>
                            <ul className="absolute left-0 top-full opacity-0 invisible group-hover:visible group-hover:opacity-100
                         transform translate-y-2 group-hover:translate-y-0 transition-all duration-300
                         bg-[#fdf4eb] shadow-xl rounded-lg min-w-[200px] py-2">
                                <li><Link to="/dashboard"
                                          className="block px-5 py-2 hover:bg-[#f7ede2] hover:text-[#7b4f2e] rounded-md transition">Dashboard</Link>
                                </li>
                                <li><Link to="/documents"
                                          className="block px-5 py-2 hover:bg-[#f7ede2] hover:text-[#7b4f2e] rounded-md transition">Documents</Link>
                                </li>
                            </ul>
                        </li>
                        <li><Link to="/shop" className="px-3 py-1 hover:text-[#7b4f2e] transition">Shop</Link></li>
                        <li className="group relative">
                            <span className="px-3 py-1 hover:text-[#7b4f2e] transition cursor-pointer">Appointment</span>
                            <ul className="absolute left-0 top-full opacity-0 invisible group-hover:visible group-hover:opacity-100
                         transform translate-y-2 group-hover:translate-y-0 transition-all duration-300
                         bg-[#fdf4eb] shadow-xl rounded-lg min-w-[200px] py-2">
                                <li><Link to="/booking"
                                          className="block px-5 py-2 hover:bg-[#f7ede2] hover:text-[#7b4f2e] rounded-md transition">Booking</Link>
                                </li>
                                <li><Link to="/service"
                                          className="block px-5 py-2 hover:bg-[#f7ede2] hover:text-[#7b4f2e] rounded-md transition">Services</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                {/* Right icons */}
                <div className="flex items-center gap-4">
                    {/* Cart icon */}
                    <Link to="/cart"
                          className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f1e0d0] transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="#7b4f2e"
                             strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="9" cy="21" r="1"/>
                            <circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                        </svg>
                        {totalItems > 0 && (
                            <span
                                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
                        )}
                    </Link>

                    {/* Search */}
                    <button
                        className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f1e0d0] transition ${searchActive ? "bg-[#f1e0d0]" : ""}`}
                        onClick={() => setSearchActive(!searchActive)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="#7b4f2e" strokeWidth="2" viewBox="0 0 24 24">
                            <circle cx="10" cy="10" r="7" />
                            <line x1="15" y1="15" x2="21" y2="21" />
                        </svg>
                    </button>

                    {searchActive && (
                        <form onSubmit={(e) => e.preventDefault()} className="relative">
                            <input
                                type="text"
                                placeholder={placeholderText}
                                className="px-3 py-1 rounded-full border border-[#7b4f2e] focus:outline-none focus:ring focus:ring-[#7b4f2e] transition w-48"
                            />
                        </form>
                    )}

                    <Link to="/login" className="px-4 py-1 rounded-full bg-[#7b4f2e] text-white hover:bg-[#5b3920] transition">
                        Login
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
