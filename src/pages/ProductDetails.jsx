import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  console.log("addToCart function:", addToCart);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) return <h2 className="text-center mt-10">Loading...</h2>;

  // Dummy Payment
  const handleBuyNow = () => {
    toast.success("Processing payment... ");
    setTimeout(() => {
      toast.success("Payment Successful! Thank you for your purchase.");
      navigate("/");
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-80 object-cover mb-4 rounded-lg shadow"
      />
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl text-green-600 font-semibold mt-2">
        ₹{product.price}
      </p>
      <p className="text-gray-700 mt-4">{product.description}</p>

      <div className="mt-4 flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={() => {
            console.log("Adding to cart:", product);
            addToCart(product);
            toast.success("🛒 Added to cart!");
          }}
        >
          Add to Cart
        </button>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
