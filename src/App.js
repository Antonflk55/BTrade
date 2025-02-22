import React, { useState } from "react";
import MainChart from "./components/MainChart";

const App = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL"); // Default stock

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value.toUpperCase()); // Convert input to uppercase for consistency
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">BTrade</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL, TSLA, BTC/USD)"
          value={selectedStock}
          onChange={handleStockChange}
          className="p-3 border border-gray-300 rounded-lg shadow-md w-1/2 text-lg"
        />
      </div>

      {/* Main Chart Component */}
      <MainChart selectedStock={selectedStock} />
    </div>
  );
};

export default App;