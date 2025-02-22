import React, { useState, useEffect } from "react";

const Indicators = ({ selectedStock }) => {
  const [indicators, setIndicators] = useState({
    MACD: "Loading...",
    MACD_Signal: "Loading...",
    EMA_50: "Loading...",
    EMA_200: "Loading...",
    RSI: "Loading...",
  });

  useEffect(() => {
    const fetchIndicators = async () => {
      const apiKey = process.env.REACT_APP_TWELVEDATA_KEY;
      if (!apiKey) {
        console.error("Twelve Data API key is missing!");
        return;
      }

      const formattedSymbol = selectedStock.includes(":")
        ? selectedStock.split(":")[1]
        : selectedStock;

      try {
        const [macdRes, ema50Res, ema200Res, rsiRes] = await Promise.all([
          fetch(`https://api.twelvedata.com/macd?symbol=${formattedSymbol}&interval=1day&apikey=${apiKey}`).then((res) => res.json()),
          fetch(`https://api.twelvedata.com/ema?symbol=${formattedSymbol}&interval=1day&time_period=50&apikey=${apiKey}`).then((res) => res.json()),
          fetch(`https://api.twelvedata.com/ema?symbol=${formattedSymbol}&interval=1day&time_period=200&apikey=${apiKey}`).then((res) => res.json()),
          fetch(`https://api.twelvedata.com/rsi?symbol=${formattedSymbol}&interval=1day&apikey=${apiKey}`).then((res) => res.json()),
        ]);

        setIndicators({
          MACD: macdRes?.values?.[0]?.macd || "N/A",
          MACD_Signal: macdRes?.values?.[0]?.macd_signal || "N/A",
          EMA_50: ema50Res?.values?.[0]?.ema || "N/A",
          EMA_200: ema200Res?.values?.[0]?.ema || "N/A",
          RSI: rsiRes?.values?.[0]?.rsi || "N/A",
        });
      } catch (error) {
        console.error("Error fetching indicators:", error);
        setIndicators({
          MACD: "Error",
          MACD_Signal: "Error",
          EMA_50: "Error",
          EMA_200: "Error",
          RSI: "Error",
        });
      }
    };

    fetchIndicators();
    const interval = setInterval(fetchIndicators, 10000);

    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className="p-4 w-full max-w-md mx-auto">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Indicators</h3>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="flex flex-col">
          <h4 className="text-gray-700 text-sm">MACD</h4>
          <p className="text-lg font-semibold">{indicators?.MACD || "Loading..."}</p>
        </div>
        <div className="flex flex-col">
          <h4 className="text-gray-700 text-sm">MACD Signal</h4>
          <p className="text-lg font-semibold">{indicators?.MACD_Signal || "Loading..."}</p>
        </div>
        <div className="flex flex-col">
          <h4 className="text-gray-700 text-sm">EMA 50</h4>
          <p className="text-lg font-semibold">{indicators?.EMA_50 || "Loading..."}</p>
        </div>
        <div className="flex flex-col">
          <h4 className="text-gray-700 text-sm">EMA 200</h4>
          <p className="text-lg font-semibold">{indicators?.EMA_200 || "Loading..."}</p>
        </div>
        <div className="flex flex-col">
          <h4 className="text-gray-700 text-sm">RSI</h4>
          <p className="text-lg font-semibold">{indicators?.RSI || "Loading..."}</p>
        </div>
      </div>
    </div>
  );
};

export default Indicators;