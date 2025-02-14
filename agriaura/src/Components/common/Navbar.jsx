

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
// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Home,
//   Layout,
//   Mail,
//   Calendar,
//   FileText,
//   ShoppingCart,
//   Users,
//   Settings,
//   LogOut,
// } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { Logout } from "../../Redux/Slices/authSlice";
// const Sidebar = () => {

//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(Logout());
//   };

//   const menuItems = [
//     { name: "Home", icon: <Layout />, path: "/dashboard" },
//     { name: "Dashboards", icon: <Home />, path: "/" },
//     { name: "Test", icon: <Mail />, path: "/test" },
//     { name: "Products", icon: <Calendar />, path: "/product" },
//     { name: "Kanban", icon: <FileText />, path: "/kanban" },
//     { name: "eCommerce", icon: <ShoppingCart />, path: "/ecommerce" },
//     { name: "Users", icon: <Users />, path: "/users" },
//     { name: "Settings", icon: <Settings />, path: "/settings" },
//   ];

//   return (
//     <div className="w-64 bg-white h-screen border-r sticky top-0 flex flex-col">
//       {/* Header */}
//       <div className="p-4 border-b text-lg font-bold text-gray-800">MATERIO</div>

//       {/* Navigation Links */}
//       <ul className="space-y-4 p-4 flex-grow">
//         {menuItems.map((item) => (
//           <li key={item.name}>
//             <NavLink
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center space-x-3 p-2 rounded-md ${isActive ? "bg-gray-200 font-bold" : "hover:bg-gray-200"
//                 }`
//               }
//             >
//               {item.icon}
//               <span className="text-gray-700">{item.name}</span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>

//       {/* Logout Button */}
//       <div className="p-4">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center space-x-3 p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
//         >
//           <LogOut />
//           <span>Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Logout } from "../../Redux/Slices/authSlice";
import {
  Home,
  Layout,
  Mail,
  Calendar,
  FileText,
  ShoppingCart,
  Users,
  Settings as SettingIcon,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(Logout());
  };

  const menuItems = [
    { name: "Home", icon: <Layout size={20} />, path: "/dashboard" }, // Set icon size
    { name: "Dashboards", icon: <Home size={20} />, path: "/" }, // Set icon size
    { name: "Test", icon: <Mail size={20} />, path: "/test" }, // Set icon size
    { name: "Products", icon: <Calendar size={20} />, path: "/product" }, // Set icon size
    { name: "Kanban", icon: <FileText size={20} />, path: "/kanban" }, // Set icon size
    { name: "eCommerce", icon: <ShoppingCart size={20} />, path: "/ecommerce" }, // Set icon size
    { name: "Users", icon: <Users size={20} />, path: "/users" }, // Set icon size
    { name: "Settings", icon: <SettingIcon size={20} />, path: "/settings" }, // Set icon size
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sticky top-0 flex flex-col bg-white text-gray-700 h-screen border-r transition-width duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      {/* Header with Collapse Button */}
      <div className="flex items-center justify-between p-4 border-b text-lg font-bold text-gray-800">
        <span className={`${isCollapsed ? 'hidden' : ''}`}>AgriAURA</span>
        <button onClick={toggleCollapse} className="focus:outline-none">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col flex-grow p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={`flex items-center p-2 space-x-3 rounded-md hover:bg-gray-100 ${location.pathname === item.path ? 'bg-gray-100 font-medium' : ''}`}
          >
            {item.icon}
            <span className={`${isCollapsed ? 'hidden' : ''}`}>{item.name}</span>
          </NavLink>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center p-2 space-x-3 rounded-md hover:bg-red-100 text-red-600"
        >
          <LogOut size={20} />
          <span className={`${isCollapsed ? 'hidden' : ''}`}>Log Out</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;