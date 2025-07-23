import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaRegGem } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-orange-100">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Just icon */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <FaRegGem className="text-orange-500 text-2xl" />
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-6 text-gray-700 text-sm font-semibold">
          <a href="#" className="hover:text-orange-600 transition">About Us</a>
          <a href="#" className="hover:text-orange-600 transition">Contact</a>
          <a href="#" className="hover:text-orange-600 transition">FAQ</a>
          <a href="#" className="hover:text-orange-600 transition">Privacy Policy</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="p-2 rounded-full bg-orange-100 hover:bg-orange-500 hover:text-white transition text-orange-500" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" className="p-2 rounded-full bg-orange-100 hover:bg-orange-500 hover:text-white transition text-orange-500" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" className="p-2 rounded-full bg-orange-100 hover:bg-orange-500 hover:text-white transition text-orange-500" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="bg-orange-500 text-white text-center py-3 text-xs font-semibold">
        &copy; {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
