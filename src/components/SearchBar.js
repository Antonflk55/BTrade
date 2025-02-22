import React from "react";

const SearchBar = ({ selectedStock, setSelectedStock }) => {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for a stock (e.g., AAPL, TSLA, BTC/USD)"
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value.toUpperCase())}
        className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-md text-lg focus:ring-2 focus:ring-blue-500 transition-all"
      />
    </div>
  );
};

export default SearchBar;