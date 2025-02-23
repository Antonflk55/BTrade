import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl p-4 md:p-8 bg-white shadow-xl rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">BTrade</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;