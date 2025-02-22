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

      try {
        const response = await fetch(
          `https://api.twelvedata.com/price?symbol=${selectedStock}&interval=1min&apikey=${apiKey}`
        );
        const data = await response.json();
        console.log("Twelve Data Price response:", data);

        if (data.price) {
          setPrice(`$${parseFloat(data.price).toFixed(2)}`);
        } else {
          setPrice("Unavailable");
        }
      } catch (error) {
        console.error("Error fetching price:", error);
        setPrice("Error");
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-md">
      <h3 className="text-lg font-semibold text-gray-800">Live Price:</h3>
      <p className="text-xl font-bold text-green-600">{price}</p>
    </div>
  );
};

export default LivePrice;