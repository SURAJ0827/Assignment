import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  //  Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = () => {
    toast.success("Payment Successful");
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between border-b py-3">
                <span>{item.title}</span>
                <span className="font-bold">₹{item.price}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-xl font-bold mt-4">Total: ₹{totalPrice}</h2>

          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            onClick={handlePayment}
          >
            Pay Now 💸
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
