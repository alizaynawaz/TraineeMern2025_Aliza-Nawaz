// src/pages/CartPage.jsx
import React from "react";
import useCart from "../hooks/useCart";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h2>
        <Link
          to="/"
          className="inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-orange-500 font-bold">${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total & Actions */}
      <div className="mt-8 border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold">
          Total: <span className="text-orange-600">${total.toFixed(2)}</span>
        </h3>
        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;


