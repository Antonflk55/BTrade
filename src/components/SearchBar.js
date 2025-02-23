import React from 'react';

// Function to handle the SearchBar logic
function SearchBar({ selectedStock, setSelectedStock }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for a stock (e.g., AAPL, TSLA, BTC/USD)"
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value.toUpperCase())} // Transform input to uppercase
        className="form-input w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

// Default export of the SearchBar component
export default SearchBar;