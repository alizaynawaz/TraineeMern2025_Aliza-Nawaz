// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (form.name && form.email && form.address) {
      alert("Order placed successfully!");
      clearCart();
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Billing Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold mb-4">Billing Details</h3>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
            <input
              type="text"
              name="address"
              placeholder="Street Address *"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP Code"
                value={form.zip}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.title} className="w-12 h-12 object-contain" />
                  <span className="text-sm text-gray-700">{item.title}</span>
                </div>
                <span className="text-sm font-bold text-orange-600">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="border-t mt-6 pt-4 flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span className="text-orange-600">${total.toFixed(2)}</span>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handleOrder}
            className="w-full mt-6 bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Back to Cart */}
      <div className="mt-8 text-center">
        <Link
          to="/cart"
          className="text-orange-500 hover:underline"
        >
          ← Back to Cart
        </Link>
      </div>
    </div>
  );
};

export default CheckoutPage;

