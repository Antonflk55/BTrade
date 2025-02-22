import React from "react";
import SearchBar from "./SearchBar";

const DashboardLayout = ({ children, selectedStock, setSelectedStock }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation with Search Bar */}
      <div className="p-4 bg-white shadow-md w-full">
        <SearchBar selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
      </div>

      {/* Main Layout */}
      <div className="flex max-w-7xl mx-auto w-full p-6 space-x-6 h-screen">
        {/* Left Side: Full-Height Chart */}
        <div className="w-2/3 h-full bg-white shadow-lg rounded-lg p-6 flex-grow">
          {children[0]} {/* Chart Component */}
        </div>

        {/* Right Side: Slightly Larger Fixed Width */}
        <div className="bg-white shadow-lg rounded-lg p-6 overflow-auto" style={{ width: "1000px", minWidth: "1000px", maxWidth: "1000px", flexShrink: 0 }}>
        {children.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;