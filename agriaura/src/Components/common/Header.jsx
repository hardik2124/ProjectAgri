// Header.jsx
import React from "react";

const Header = ({ activeTab }) => {
  return (
    <div className="bg-white p-4 shadow-md flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">{activeTab}</h1>
      </div>
    </div>
  );
};

export default Header;
