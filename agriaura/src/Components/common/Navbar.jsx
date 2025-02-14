

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Logout } from '../../Redux/Slices/authSlice';

// function Navbar() {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(Logout());
//   };

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-lg font-bold">
//           <Link to="/">MyApp</Link>
//         </div>
//         <div className="space-x-4">
//           {isAuthenticated ? (
//             <button
//               onClick={handleLogout}
//               className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//             >
//               Logout
//             </button>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//               >
//                 Sign Up
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;











// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Layout,
  Mail,
  Calendar,
  FileText,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Logout } from "../../Redux/Slices/authSlice";
const Sidebar = () => {

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
  };

  const menuItems = [
    { name: "Home", icon: <Layout />, path: "/dashboard" },
    { name: "Dashboards", icon: <Home />, path: "/" },
    { name: "Test", icon: <Mail />, path: "/test" },
    { name: "Products", icon: <Calendar />, path: "/product" },
    { name: "Kanban", icon: <FileText />, path: "/kanban" },
    { name: "eCommerce", icon: <ShoppingCart />, path: "/ecommerce" },
    { name: "Users", icon: <Users />, path: "/users" },
    { name: "Settings", icon: <Settings />, path: "/settings" },
  ];

  return (
    <div className="w-64 bg-white h-screen border-r sticky top-0 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b text-lg font-bold text-gray-800">MATERIO</div>

      {/* Navigation Links */}
      <ul className="space-y-4 p-4 flex-grow">
        {menuItems.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 p-2 rounded-md ${isActive ? "bg-gray-200 font-bold" : "hover:bg-gray-200"
                }`
              }
            >
              {item.icon}
              <span className="text-gray-700">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
        >
          <LogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
