import React, { useState } from "react";
import MainChart from "./components/MainChart";

const App = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL"); // Default stock

  const handleStockChange = (event) => {
    setSelectedStock(event.target.value.toUpperCase()); // Convert input to uppercase for consistency
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">BTrade</h1>

      {/* Search Bar for Stock Selection */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL, TSLA, BTC/USD)"
          value={selectedStock}
          onChange={handleStockChange}
          className="p-2 border border-gray-400 rounded-md w-full"
        />
      </div>

      {/* Main Chart Component (Now Dynamic) */}
      <MainChart selectedStock={selectedStock} />
    </div>
  );
};

export default App;