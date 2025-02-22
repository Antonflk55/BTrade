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
          <li>📈 <strong>EMA (50):</strong> {indicators.ema50}</li>
          <li>📉 <strong>EMA (200):</strong> {indicators.ema200}</li>
          <li>⚡ <strong>RVI:</strong> {indicators.rvi}</li>
          <li>☁️ <strong>Ichimoku Cloud:</strong> {indicators.ichimoku}</li>
          <li>📊 <strong>Keltner Channels:</strong> {indicators.keltner}</li>
          <li>📈 <strong>OBV:</strong> {indicators.obv}</li>
        </ul>
      ) : (
        <p className="text-gray-500">Loading indicators...</p>
      )}
    </div>
  );
};

export default Indicators;