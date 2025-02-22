import React from "react";

const Sidebar = ({ onSelectStock }) => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold">BTrade</h2>
      <ul className="mt-4">
        <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => onSelectStock("NASDAQ:AAPL")}>Apple (AAPL)</li>
        <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => onSelectStock("NASDAQ:TSLA")}>Tesla (TSLA)</li>
        <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => onSelectStock("BITSTAMP:BTCUSD")}>Bitcoin (BTC)</li>
        <li className="p-2 hover:bg-gray-700 cursor-pointer" onClick={() => onSelectStock("BITSTAMP:ETHUSD")}>Ethereum (ETH)</li>
      </ul>
    </div>
  );
};

export default Sidebar;