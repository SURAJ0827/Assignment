import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  // Check user authentication
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Fetch API data
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Handle Logout
  const handleLogout = () => {
    signOut(auth).then(() => {
      toast.success("Logged out successfully :)");
      setUser(null);
    });
  };

  // Handle Search and Filter
  useEffect(() => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    if (category) {
      filtered = filtered.filter(
        (product) => product.category.name === category
      );
    }
    setFilteredProducts(filtered);
  }, [search, category, products]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
          <h1 className="text-2xl font-bold text-gray-800">🛍️ EZBuy</h1>

          <div className="flex gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/auth")}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                Login
              </button>
            )}

            {user && (
              <Link
                to="/cart"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-300"
              >
                🛒 View Cart
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-2 border rounded-lg shadow-sm"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/4 p-2 border rounded-lg shadow-sm"
          >
            <option value="">All Categories</option>
            {[...new Set(products.map((p) => p.category.name))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2 text-gray-800">
                {product.title}
              </h2>
              <p className="text-green-600 font-bold text-xl">
                ₹{product.price}
              </p>

              {user ? (
                <Link
                  to={`/product/${product.id}`}
                  className="block bg-blue-500 hover:bg-blue-600 text-white text-center mt-3 p-2 rounded-lg transition-all duration-300"
                >
                  View Details
                </Link>
              ) : (
                <p className="text-center text-gray-500 text-sm mt-3">
                  Login to view details
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-white shadow-md text-center p-4 mt-6 rounded-lg">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} EZBuy. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
