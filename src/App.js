import React, { useState, useEffect } from "react";
import "./styles.css"; // Import global styles
import DashboardLayout from "./components/DashboardLayout";
import ChartComponent from "./components/ChartComponent"; // ✅ Using only Lightweight Charts
import Indicators from "./components/Indicators";
import NewsSentiment from "./components/NewsSentiment";
import AIInsights from "./components/AIInsights";

const App = () => {
    const [selectedStock, setSelectedStock] = useState("AAPL"); // ✅ Default stock: Apple
    const [generalNews, setGeneralNews] = useState([]);
    const [chartData, setChartData] = useState([]);

    // ✅ Fetch Stock Data Based on Search Bar Input
    useEffect(() => {
        const fetchStockData = async () => {
            try {
                // ✅ Replace this with a real stock API (e.g. TwelveData, AlphaVantage, Yahoo Finance)
                const response = await fetch(`https://api.twelvedata.com/time_series?symbol=${selectedStock}&interval=1day&apikey=${process.env.REACT_APP_TWELVEDATA_KEY}`);
                const data = await response.json();

                if (!data || !data.values) {
                    console.error("❌ No data found for stock:", selectedStock);
                    return;
                }

                // ✅ Convert API response into Lightweight Charts format
                const formattedData = data.values.map(entry => ({
                    time: entry.datetime.split(" ")[0], // ✅ Extract only YYYY-MM-DD
                    value: parseFloat(entry.close),
                })).reverse(); // Reverse to make it oldest → newest

                setChartData(formattedData);
            } catch (error) {
                console.error("❌ Error fetching stock data:", error);
            }
        };

        fetchStockData();
    }, [selectedStock]); // ✅ Runs when `selectedStock` changes

    return (
        <DashboardLayout selectedStock={selectedStock} setSelectedStock={setSelectedStock}>
            <ChartComponent symbol={selectedStock} chartData={chartData} /> {/* ✅ Chart now updates dynamically */}
            <Indicators selectedStock={selectedStock} />
            <NewsSentiment selectedStock={selectedStock} setGeneralNews={setGeneralNews} />
            <AIInsights selectedStock={selectedStock} indicators={{}} generalNews={generalNews} />
        </DashboardLayout>
    );
};

export default App;