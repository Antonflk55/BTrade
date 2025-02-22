import React, { useState, useEffect } from "react";

const Indicators = ({ selectedStock }) => {
  const [indicators, setIndicators] = useState({
    MACD: "Loading...",
    MACD_Signal: "Loading...",
    EMA_50: "Loading...",
    EMA_200: "Loading...",
    RSI: "Loading...",
    Keltner: "Loading...",
  });

  useEffect(() => {
    const fetchIndicators = async () => {
      const apiKey = process.env.REACT_APP_TWELVEDATA_KEY;
      if (!apiKey) {
        console.error("Twelve Data API key is missing!");
        return;
      }

      // Convert stock symbol format for Twelve Data API
      const formattedSymbol = selectedStock.includes(":")
        ? selectedStock.split(":")[1]
        : selectedStock;

      try {
        // Fetch MACD
        const macdResponse = await fetch(
          `https://api.twelvedata.com/macd?symbol=${formattedSymbol}&interval=1day&apikey=${apiKey}`
        );
        const macdData = await macdResponse.json();
        console.log("Twelve Data MACD response:", macdData);

        // Fetch EMA 50
        const ema50Response = await fetch(
          `https://api.twelvedata.com/ema?symbol=${formattedSymbol}&interval=1day&time_period=50&apikey=${apiKey}`
        );
        const ema50Data = await ema50Response.json();
        console.log("Twelve Data EMA 50 response:", ema50Data);

        // Fetch EMA 200
        const ema200Response = await fetch(
          `https://api.twelvedata.com/ema?symbol=${formattedSymbol}&interval=1day&time_period=200&apikey=${apiKey}`
        );
        const ema200Data = await ema200Response.json();
        console.log("Twelve Data EMA 200 response:", ema200Data);

        // Fetch RSI
        const rsiResponse = await fetch(
          `https://api.twelvedata.com/rsi?symbol=${formattedSymbol}&interval=1day&apikey=${apiKey}`
        );
        const rsiData = await rsiResponse.json();
        console.log("Twelve Data RSI response:", rsiData);

        // Fetch Keltner Channels
        const keltnerResponse = await fetch(
          `https://api.twelvedata.com/keltner?symbol=${formattedSymbol}&interval=1day&apikey=${apiKey}`
        );
        const keltnerData = await keltnerResponse.json();
        console.log("Twelve Data Keltner response:", keltnerData);

        setIndicators({
          MACD: macdData.values?.[0]?.macd || "N/A",
          MACD_Signal: macdData.values?.[0]?.macd_signal || "N/A",
          EMA_50: ema50Data.values?.[0]?.ema || "N/A",
          EMA_200: ema200Data.values?.[0]?.ema || "N/A",
          RSI: rsiData.values?.[0]?.rsi || "N/A",
          Keltner: keltnerData.values?.[0]?.keltner_channel_middle || "N/A",
        });
      } catch (error) {
        console.error("Error fetching indicators:", error);
        setIndicators({
          MACD: "Error",
          MACD_Signal: "Error",
          EMA_50: "Error",
          EMA_200: "Error",
          RSI: "Error",
          Keltner: "Error",
        });
      }
    };

    fetchIndicators();
    const interval = setInterval(fetchIndicators, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [selectedStock]);

  return (
    <div className="bg-white p-4 shadow-lg rounded-md mt-4">
      <h3 className="text-lg font-bold">Technical Indicators</h3>
      <ul className="mt-2">
        <li><strong>MACD:</strong> {indicators.MACD}</li>
        <li><strong>MACD Signal:</strong> {indicators.MACD_Signal}</li>
        <li><strong>EMA 50:</strong> {indicators.EMA_50}</li>
        <li><strong>EMA 200:</strong> {indicators.EMA_200}</li>
        <li><strong>RSI:</strong> {indicators.RSI}</li>
      </ul>
    </div>
  );
};

export default Indicators;