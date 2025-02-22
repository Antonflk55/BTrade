import React, { useState } from "react";
import LivePrice from "./LivePrice";
import Indicators from "./Indicators";
import NewsSentiment from "./NewsSentiment";
import AIInsights from "./AIInsights";

const MainChart = ({ selectedStock }) => {
  const [generalNews, setGeneralNews] = useState([]);

  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold">Live Chart for {selectedStock}</h2>

      {/* Live Price */}
      <LivePrice selectedStock={selectedStock} />

      {/* Technical Indicators */}
      <Indicators selectedStock={selectedStock} />

      {/* Latest Financial News */}
      <NewsSentiment selectedStock={selectedStock} setGeneralNews={setGeneralNews} />

      {/* AI Insights - Uses News + Indicators for Trading Predictions */}
      <AIInsights selectedStock={selectedStock} indicators={{}} generalNews={generalNews} />

      {/* TradingView Chart */}
      <div className="mt-4">
        <iframe
          src={`https://s.tradingview.com/widgetembed/?symbol=${selectedStock}&interval=D&width=100%25&height=400&hide_top_toolbar=1&hide_side_toolbar=1`}
          width="100%"
          height="400"
          allowTransparency="true"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MainChart;