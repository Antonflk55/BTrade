import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MainChart from "./components/MainChart";

const App = () => {
  const [selectedStock, setSelectedStock] = useState("NASDAQ:AAPL"); // Default to Apple

  return (
    <div className="flex h-screen">
      <Sidebar onSelectStock={setSelectedStock} />
      <MainChart selectedStock={selectedStock} />
    </div>
  );
};

export default App;