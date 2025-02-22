import React from "react";

const IndicatorChart = ({ title, data }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h4 className="text-md font-semibold text-gray-800">{title}</h4>
      <div className="h-16 w-full bg-gray-200 rounded-md flex items-center justify-center">
        {data ? <span className="text-green-500 font-bold">{data}</span> : <span className="text-gray-500">Loading...</span>}
      </div>
    </div>
  );
};

export default IndicatorChart;