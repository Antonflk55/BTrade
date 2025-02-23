import React, { useEffect, useRef } from "react";

const MainChart = ({ selectedStock }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!selectedStock || !chartContainerRef.current) return;

    // Clean up the container before adding a new widget
    chartContainerRef.current.innerHTML = "";

    // Create TradingView Widget
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [[selectedStock]],
      width: "100%",
      height: "500",
      locale: "en",
      colorTheme: "light",
      autosize: true,
    });

    chartContainerRef.current.appendChild(script);
  }, [selectedStock]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Live Chart for {selectedStock}
      </h2>
      <div ref={chartContainerRef} className="w-full h-96"></div>
    </div>
  );
};

export default MainChart;