import React, { useState, useEffect } from "react";
import { Pencil, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../Services/Oprations/ProductOP";
import axios from "axios";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stock, setStock] = useState({});
  const [products, setProducts] = useState([]); // Renamed to products for clarity
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true when fetching starts
      setError(null); // Clear any previous errors
      try {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) {
          console.error("User data not found in local storage.");
          setError("User data not found. Please log in."); // Set error message
          return;
        }

        const user = JSON.parse(storedUser);
        const ownerId = user._id;

        if (!ownerId) {
          console.error("Owner ID not found in user data.");
          setError("Owner ID not found. Contact support."); // Set error message
          return;
        }

        const url = `http://localhost:5154/api/v1/product/allproducts?ownerId=${ownerId}`;

        const response = await axios.get(url); // Corrected
        const data = response.data; // Extract data object

        if (data && data.sucess && data.products) {
          setProducts(data.products); //  Access to the real products array
          //console.log(product);
        } else {
          console.warn("No products or invalid format received:", data);
          setError("No products found.");
          setProducts([]);
        }

        // Extract unique categories from the products data
        const uniqueCategories = [
          "All", // "All" is always included as an option
          ...new Set(products.map((product) => product.category)), // Get unique categories
        ];
        setCategories(uniqueCategories);

      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products."); // Set error message
      } finally {
        setLoading(false); // Set loading to false when fetching is complete (success or error)
      }
    };

    fetchProducts();

  }, []);

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateStock = (id, change) => {
    // (Implementation for stock updates)
  };

  if (loading) return <div className="p-4">Loading products...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center my-6">
        <div className="flex space-x-4 mb-4 md:mb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full border ${selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-full py-2 px-4 shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id} // Use product._id
            className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative"
          >
            {/* Edit Icon */}
            <button className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <Pencil size={18} className="text-gray-600" />
            </button>

            {/* Plus and Minus Buttons (example) */}
            {/*
              <div className="absolute top-12 right-2 flex flex-col space-y-2">
              <button onClick={() => updateStock(product.id, 1)} className="bg-green-500 p-2 rounded-full hover:bg-green-600">
              <Plus size={18} className="text-white" />
              </button>
              <button onClick={() => updateStock(product.id, -1)} className="bg-red-500 p-2 rounded-full hover:bg-red-600">
              <Minus size={18} className="text-white" />
              </button>
              </div>
            */}

            {product.images && product.images.length > 0 ? (
              <img src={product.images[0].url} alt={product.productName} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">No Image</div>
            )}

            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">{product.productName}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-500">
                <b>Category:</b> {product.category}
              </p>
              <p className="text-sm text-gray-500">
                <b>Net Weight:</b> {product.netWeight} g
              </p>
              <p className="text-xl font-bold text-orange-500">
                ${product.pricePerUnit} per {product.unit}
              </p>

              <div className="flex items-center justify-center space-x-3 mt-3">
                <span className="text-lg font-bold">Stock: {product.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;