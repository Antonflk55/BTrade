import React from 'react';
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';

function DashboardLayout({ children, selectedStock, setSelectedStock }) {
  return (
    <div className="flex min-h-screen bg-gray-100"> {/* Using Tailwind for overall layout */}
      <Sidebar />
      <div className="flex-1 p-4"> {/* Main content area */}
        <SearchBar selectedStock={selectedStock} setSelectedStock={setSelectedStock} />
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout;