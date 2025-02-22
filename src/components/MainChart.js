import React, { useState } from "react";
import LivePrice from "./LivePrice";
import Indicators from "./Indicators";
import NewsSentiment from "./NewsSentiment";
import AIInsights from "./AIInsights";

const MainChart = ({ selectedStock }) => {
  const [generalNews, setGeneralNews] = useState([]);

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Live Chart for {selectedStock}</h2>

      {/* Live Price Section */}
      <div className="w-full max-w-4xl bg-gray-100 p-4 rounded-md shadow">
        <LivePrice selectedStock={selectedStock} />
      </div>

      {/* Technical Indicators Section */}
      <div className="w-full max-w-4xl bg-gray-100 p-4 mt-4 rounded-md shadow">
        <Indicators selectedStock={selectedStock} />
      </div>

      {/* Financial News Section */}
      <div className="w-full max-w-4xl bg-gray-100 p-4 mt-4 rounded-md shadow">
        <NewsSentiment selectedStock={selectedStock} setGeneralNews={setGeneralNews} />
      </div>

      {/* AI Insights Section */}
      <div className="w-full max-w-4xl bg-gray-100 p-4 mt-4 rounded-md shadow">
        <AIInsights selectedStock={selectedStock} indicators={{}} generalNews={generalNews} />
      </div>

      {/* TradingView Chart */}
      <div className="mt-6 w-full max-w-5xl">
        <iframe
          src={`https://s.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&width=100%25&height=400&hide_top_toolbar=1&hide_side_toolbar=1`}
          width="100%"
          height="400"
          allowTransparency="true"
          frameBorder="0"
          allowFullScreen
          className="rounded-lg shadow-md"
        ></iframe>
      </div>
    </div>
  );
};

export default MainChart;