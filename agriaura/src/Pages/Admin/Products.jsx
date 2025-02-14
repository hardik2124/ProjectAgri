import React, { useState, useEffect } from "react";
import { Pencil, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../Services/Oprations/ProductOP";

const AllProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [stock, setStock] = useState({});
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth.token);
  const [categories, setCategories] = useState(["All"]);


 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProduct(userDetails);
        console.log(data)// Dispatch the Redux action
        console.log(userDetails);
        if (data) setProduct(data);
        console.log("card dataaaa ===== " + data)

        const uniqueCategories = [
          "All", // "All" is always included as an option
          ...new Set(data.map((product) => product.category)), // Get unique categories
        ];
        setCategories(uniqueCategories);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };


    fetchProducts(); // Only fetch if user details exist

  }, []);

  // const products = [
  //   {
  //     id: 1,
  //     productName: "Strawberry",
  //     description: "Fresh strawberries, rich in vitamins and antioxidants.",
  //     category: "seeds",
  //     pricePerUnit: 85,
  //     unit: "kg",
  //     stock: 20,
  //     netWeight: 1000,
  //     images: [{ url: "https://via.placeholder.com/150?text=Strawberry", altText: "Strawberry" }],
  //   },
  //   {
  //     id: 2,
  //     productName: "Berry",
  //     description: "Mixed berries with high nutritional value.",
  //     category: "seeds",
  //     pricePerUnit: 70,
  //     unit: "kg",
  //     stock: 15,
  //     netWeight: 500,
  //     images: [{ url: "https://via.placeholder.com/150?text=Berry", altText: "Berry" }],
  //   },
  //   {
  //     id: 3,
  //     productName: "Lemon",
  //     description: "Fresh lemons sourced from organic farms.",
  //     category: "seeds",
  //     pricePerUnit: 35,
  //     unit: "kg",
  //     stock: 30,
  //     netWeight: 1000,
  //     images: [{ url: "https://via.placeholder.com/150?text=Lemon", altText: "Lemon" }],
  //   },
  // ];

  const filteredProducts = product.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const updateStock = (id, change) => {
  //   const newStock = Math.max((stock[id] || 0) + change, 0);
  //   setStock((prev) => ({ ...prev, [id]: newStock }));

  //   // Send update to server
  //   fetch(`/api/stock/${id}`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ stock: newStock }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log("Stock updated:", data))
  //     .catch((error) => console.error("Error updating stock:", error));
  // };

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center my-6">
        <div className="flex space-x-4 mb-4 md:mb-0">
          {["All", "seeds", "fertilizers", "tools", "pesticides", "other"].map((category) => (
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
            key={product.id}
            className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 relative"
          >
            {/* Edit Icon */}
            <button className="absolute top-2 right-2 bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <Pencil size={18} className="text-gray-600" />
            </button>

            {/* Plus and Minus Buttons */}
            {/* <div className="absolute top-12 right-2 flex flex-col space-y-2">
              <button onClick={() => updateStock(product.id, 1)} className="bg-green-500 p-2 rounded-full hover:bg-green-600">
                <Plus size={18} className="text-white" />
              </button>
              <button onClick={() => updateStock(product.id, -1)} className="bg-red-500 p-2 rounded-full hover:bg-red-600">
                <Minus size={18} className="text-white" />
              </button>
            </div> */}

            <img src={product.images[0].url} alt={product.images[0].altText} className="w-full h-40 object-cover" />
            <div className="p-4 text-center">
              <h2 className="text-lg font-bold">{product.productName}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-500"><b>Category:</b> {product.category}</p>
              <p className="text-sm text-gray-500"><b>Net Weight:</b> {product.netWeight}g</p>
              <p className="text-xl font-bold text-orange-500">${product.pricePerUnit} per {product.unit}</p>

              {/* Stock Display */}
              <div className="flex items-center justify-center space-x-3 mt-3">
                <span className="text-lg font-bold">Stock: {stock[product.id] || product.stock}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;






//2nd option
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AllProducts = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState(["All"]); // Initialize with "All" as a default category
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Replace with your actual API URL
//     axios
//       .get("https://api.example.com/products")
//       .then((response) => {
//         const data = response.data;
//         setProducts(data);

//         // Extract unique categories from the products data
//         const uniqueCategories = [
//           "All", // "All" is always included as an option
//           ...new Set(data.map((product) => product.category)), // Get unique categories
//         ];
//         setCategories(uniqueCategories);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const filteredProducts = products.filter(
//     (product) =>
//       (selectedCategory === "All" || product.category === selectedCategory) &&
//       product.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {/* Search and Filters */}
//       <div className="flex flex-col md:flex-row justify-between items-center my-6">
//         <div className="flex space-x-4 mb-4 md:mb-0">
//           {categories.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full border ${
//                 selectedCategory === category
//                   ? "bg-orange-500 text-white"
//                   : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//         <div className="relative w-64">
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full border border-gray-300 rounded-full py-2 px-4 shadow-sm focus:outline-none focus:border-blue-500"
//           />
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white border rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
//           >
//             <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
//             <div className="p-4 text-center">
//               <h2 className="text-lg font-bold">{product.name}</h2>
//               <p className="text-gray-600">Per Kg</p>
//               <p className="text-xl font-bold text-orange-500">${product.price}</p>
//               <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600">
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
