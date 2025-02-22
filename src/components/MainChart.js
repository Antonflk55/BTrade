import React from "react";

const MainChart = ({ selectedStock }) => {
  return (
    <div className="w-full h-[600px]">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Live Chart for {selectedStock}</h2>
      <iframe
        src={`https://s.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&width=100%25&height=600&hide_top_toolbar=1&hide_side_toolbar=1`}
        width="100%"
        height="1000"
        allowTransparency="true"
        frameBorder="0"
        allowFullScreen
        className="rounded-md shadow-sm"
      ></iframe>
    </div>
  );
};

export default MainChart;