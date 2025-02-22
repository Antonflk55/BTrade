import React, { useState } from "react";
import DashboardLayout from "./components/DashboardLayout";
import MainChart from "./components/MainChart";
import LivePrice from "./components/LivePrice";
import Indicators from "./components/Indicators";
import NewsSentiment from "./components/NewsSentiment";
import AIInsights from "./components/AIInsights";

const App = () => {
  const [selectedStock, setSelectedStock] = useState("AAPL");
  const [generalNews, setGeneralNews] = useState([]);

  return (
    <DashboardLayout selectedStock={selectedStock} setSelectedStock={setSelectedStock}>
      {/* Chart on the Left */}
      <MainChart selectedStock={selectedStock} />

      {/* Everything Else in One Box on the Right (Limited Width) */}
      <div className="w-full max-w-md">
        <LivePrice selectedStock={selectedStock} />
        <Indicators selectedStock={selectedStock} />
        <NewsSentiment selectedStock={selectedStock} setGeneralNews={setGeneralNews} />
        <AIInsights selectedStock={selectedStock} indicators={{}} generalNews={generalNews} />
      </div>
    </DashboardLayout>
  );
};

export default App;