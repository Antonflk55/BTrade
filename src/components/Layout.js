import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">BTrade</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;