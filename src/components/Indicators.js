import React, { useState, useEffect } from "react";

const Indicators = ({ selectedStock }) => {
  const [indicators, setIndicators] = useState(null);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=MACD&symbol=${selectedStock}&interval=daily&apikey=${process.env.REACT_APP_ALPHA_KEY}`
        );
        const data = await response.json();
        setIndicators(data["Technical Analysis: MACD"]);
      } catch (error) {
        console.error("Error fetching indicators:", error);
      }
    };

    fetchIndicators();
    const interval = setInterval(fetchIndicators, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className="bg-white p-4 shadow-lg rounded-md mt-4">
      <h3 className="text-lg font-bold">Technical Indicators</h3>
      {indicators ? (
        <ul className="mt-2">
          <li>📈 **MACD:** {Object.values(indicators)[0]?.MACD}</li>
          <li>📉 **RSI:** {Object.values(indicators)[0]?.RSI}</li>
          <li>📊 **EMA 50:** {Object.values(indicators)[0]?.EMA50}</li>
        </ul>
      ) : (
        <p className="text-gray-500">Loading indicators...</p>
      )}
    </div>
  );
};

export default Indicators;