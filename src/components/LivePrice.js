import React, { useState, useEffect } from "react";

const LivePrice = ({ selectedStock }) => {
  const [price, setPrice] = useState("Loading...");

  useEffect(() => {
    const fetchPrice = async () => {
      const apiKey = process.env.REACT_APP_TWELVEDATA_KEY;
      if (!apiKey) {
        console.error("Twelve Data API key is missing!");
        setPrice("API Key Missing");
        return;
      }

      // Convert stock symbols to the correct format for Twelve Data
      const formattedSymbol = selectedStock.includes(":")
        ? selectedStock.split(":")[1] // Removes exchange if present
        : selectedStock;

      try {
        const response = await fetch(
          `https://api.twelvedata.com/price?symbol=${formattedSymbol}&interval=1min&apikey=${apiKey}`
        );
        const data = await response.json();
        console.log("Twelve Data response:", data);

        if (data.price) {
          setPrice(`$${parseFloat(data.price).toFixed(2)}`);
        } else {
          console.warn("Unexpected Twelve Data response format:", data);
          setPrice("Unavailable");
        }
      } catch (error) {
        console.error("Error fetching price:", error);
        setPrice("Error");
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000); // Refresh price every 5 seconds

    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className="bg-gray-200 p-4 rounded-md mt-4">
      <h3 className="text-lg font-bold">{selectedStock}</h3>
      <p className="text-xl text-green-600">{price}</p>
    </div>
  );
};

export default LivePrice;