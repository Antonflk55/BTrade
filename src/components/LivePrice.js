import React, { useState, useEffect } from "react";

const LivePrice = ({ selectedStock }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(`https://api.tradingview.com/symbols/${selectedStock}`);
        const data = await response.json();
        setPrice(data.price);
      } catch (error) {
        console.error("Error fetching price:", error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000); // Refresh price every 5 seconds

    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className="bg-gray-200 p-4 rounded-md mt-4">
      <h3 className="text-lg font-bold">{selectedStock}</h3>
      <p className="text-xl text-green-600">{price ? `$${price}` : "Loading..."}</p>
    </div>
  );
};

export default LivePrice;