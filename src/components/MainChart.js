import React from "react";

const MainChart = () => {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold">Live Trading Chart</h2>
      <div className="mt-4">
        <iframe
          src="https://www.tradingview.com/widgetembed/?frameElementId=tradingview_1&symbol=NASDAQ:AAPL&interval=D&width=100%25&height=400&hide_top_toolbar=1&hide_side_toolbar=1"
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