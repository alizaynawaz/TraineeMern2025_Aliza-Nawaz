// src/components/Navbar.jsx
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import { FaRegGem } from "react-icons/fa";
import { Link } from "react-router-dom";
import React from "react";
import useCart from "../hooks/useCart";
import useSearch from "../hooks/useSearch"; //  Import search store

const Navbar = () => {
  const { cart } = useCart();
  const cartCount = cart.length;

  const { searchTerm, setSearchTerm } = useSearch(); // Get & set search term

  return (
    <nav className="w-full bg-white shadow-md">
      {/* Main Bar */}
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Logo */}
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <FaRegGem className="text-orange-500 text-2xl group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-2xl text-gray-900 group-hover:text-orange-600 transition-colors">
              ShopGem
            </span>
          </Link>
        </div>

        {/*  Search Bar (Now connected to global search) */}
        <div className="flex items-center gap-2 w-full max-w-md bg-gray-100 rounded-lg px-3 py-1 mx-auto md:mx-0">
          <FiSearch className="text-gray-500 text-lg" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent outline-none text-sm"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center justify-end gap-6 text-gray-700 text-xl">
          <button className="p-2 rounded-full hover:bg-orange-100 transition" aria-label="Account">
            <FiUser />
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-orange-100 transition"
            aria-label="Cart"
          >
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-screen-lg mx-auto px-4 py-3 flex flex-wrap justify-center md:justify-between gap-4">
          {["Home", "Shop", "Collections", "Deals", "Contact"].map((item) => (
            <span
              key={item}
              className="uppercase text-sm tracking-wide text-gray-700 font-semibold hover:text-orange-600 cursor-pointer"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





