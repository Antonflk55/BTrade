import React, { useState, useEffect } from "react";

const Indicators = ({ selectedStock }) => {
  const [indicators, setIndicators] = useState(null);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const response = await fetch(`https://api.tradingview.com/indicators/${selectedStock}`);
        const data = await response.json();
        setIndicators(data);
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
          <li>📈 **EMA (50):** {indicators.ema50}</li>
          <li>📉 **EMA (200):** {indicators.ema200}</li>
          <li>⚡ **RVI:** {indicators.rvi}</li>
          <li>☁️ **Ichimoku Cloud:** {indicators.ichimoku}</li>
          <li>📊 **Keltner Channels:** {indicators.keltner}</li>
          <li>📈 **OBV:** {indicators.obv}</li>
        </ul>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Indicators;