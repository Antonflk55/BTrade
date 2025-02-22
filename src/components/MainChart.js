import React from "react";
import LivePrice from "./LivePrice";
import Indicators from "./Indicators";
import NewsSentiment from "./NewsSentiment";
import AIInsights from "./AIInsights";

const MainChart = ({ selectedStock }) => {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold">Live Chart for {selectedStock}</h2>
      <LivePrice selectedStock={selectedStock} />
      <Indicators selectedStock={selectedStock} />
      <NewsSentiment selectedStock={selectedStock} />
      <AIInsights selectedStock={selectedStock} indicators={{ ema50: 0, ema200: 0, rvi: 0, ichimoku: 0, keltner: 0, obv: 0 }} newsSentiment="Neutral" />
      <div className="mt-4">
        <iframe
          src={`https://www.tradingview.com/widgetembed/?frameElementId=tradingview_1&symbol=${selectedStock}&interval=D&width=100%25&height=400&hide_top_toolbar=1&hide_side_toolbar=1`}
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