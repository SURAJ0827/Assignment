import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const { cart, removeFromCart } = useCart();

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        cart.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center border-b py-3"
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-green-600 font-bold">₹{product.price}</p>
            </div>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => removeFromCart(product.id)}
            >
              Remove
            </button>
            <button
              className="bg-blue-500 text-white px-4 ml-2 py-1 rounded hover:bg-blue-600"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
