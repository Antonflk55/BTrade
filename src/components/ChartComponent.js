import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const ChartComponent = ({ symbol }) => {
    const chartContainerRef = useRef(null);
    const chartInstance = useRef(null);
    const priceSeriesRef = useRef(null);
    const [chartData, setChartData] = useState([]);
    const [selectedInterval, setSelectedInterval] = useState("1D"); // Default to 1D
    const [containerWidth, setContainerWidth] = useState(0);

    // Define API Fetch Intervals Based on Selected View
    const intervalMapping = {
        "1D": "1min",  // 1-minute intervals for the last 24 hours
        "1W": "5min",  // 5-minute intervals for the last 7 days
        "1M": "30min", // 30-minute intervals for the last 30 days
        "1Y": "4h",    // 4-hour intervals for the last year
        "ALL": "3day", // 3-day intervals for full history
    };

    // Fetch Stock Data Based on Selected Time Interval
    useEffect(() => {
        if (!selectedInterval) return; // Prevent fetching if no interval is set

        const fetchStockData = async () => {
            try {
                const interval = intervalMapping[selectedInterval] || "1day"; // Default to daily
                const outputsize = selectedInterval === "1D" ? "1440" : "5000";
                const response = await fetch(
                    `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${process.env.REACT_APP_TWELVEDATA_KEY}`
                );
                const data = await response.json();

                if (!data || !data.values) {
                    console.error("No data found for stock:", symbol);
                    return;
                }

                const formattedData = data.values.map(entry => ({
                    time: new Date(entry.datetime).getTime() / 1000,
                    value: parseFloat(entry.close),
                })).reverse();

                setChartData(formattedData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
            }
        };

        fetchStockData();
    }, [symbol, selectedInterval]);

    // Ensure Container is Ready Before Initializing Chart
    useEffect(() => {
        const checkContainerWidth = () => {
            if (chartContainerRef.current && chartContainerRef.current.clientWidth > 0) {
                setContainerWidth(chartContainerRef.current.clientWidth);
            } else {
                setTimeout(checkContainerWidth, 100);
            }
        };

        checkContainerWidth();
    }, []);

    // Resize Observer to adjust chart width on window resize
    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (entry.target === chartContainerRef.current) {
                    const newWidth = entry.contentRect.width;
                    if (newWidth !== containerWidth) {
                        setContainerWidth(newWidth);
                    }
                }
            }
        });

        if (chartContainerRef.current) {
            resizeObserver.observe(chartContainerRef.current);
        }

        return () => {
            if (chartContainerRef.current) {
                resizeObserver.unobserve(chartContainerRef.current);
            }
        };
    }, [containerWidth]);

    // Initialize & Update Chart Only When Container is Ready
    useEffect(() => {
        if (!chartContainerRef.current || chartData.length === 0 || containerWidth === 0) return;

        if (chartInstance.current) {
            chartInstance.current.remove();
            chartInstance.current = null;
        }

        const chart = createChart(chartContainerRef.current, {
            width: containerWidth,
            height: 400,
            layout: {
                backgroundColor: "#ffffff",
                textColor: "#222222",
            },
            grid: {
                vertLines: { color: "rgba(197, 203, 206, 0.4)" },
                horzLines: { color: "rgba(197, 203, 206, 0.4)" },
            },
            timeScale: {
                borderColor: "rgba(197, 203, 206, 0.8)",
                timeVisible: true,
                secondsVisible: false,
                rightOffset: 10,
                fixLeftEdge: false,
                fixRightEdge: false,
            },
            crosshair: {
                mode: 1,
            },
        });

        const priceSeries = chart.addAreaSeries({
            topColor: "rgba(255, 0, 0, 0.4)",
            bottomColor: "rgba(255, 0, 0, 0.05)",
            lineColor: "rgba(255, 0, 0, 1)",
            lineWidth: 2,
        });

        priceSeries.setData(chartData);
        chartInstance.current = chart;
        priceSeriesRef.current = priceSeries;

        if (chartData.length > 0) {
            const lastCandle = chartData[chartData.length - 1].time;
            let from;

            switch (selectedInterval) {
                case "1D":
                    from = lastCandle - 24 * 60 * 60;
                    break;
                case "1W":
                    from = lastCandle - 7 * 24 * 60 * 60;
                    break;
                case "1M":
                    from = lastCandle - 30 * 24 * 60 * 60;
                    break;
                case "1Y":
                    from = lastCandle - 365 * 24 * 60 * 60;
                    break;
                case "ALL":
                default:
                    from = chartData[0].time;
                    break;
            }

            chart.timeScale().setVisibleRange({ from, to: lastCandle });
            chart.timeScale().fitContent();
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.remove();
                chartInstance.current = null;
            }
        };
    }, [symbol, chartData, containerWidth, selectedInterval]);

    useEffect(() => {
        if (selectedInterval === null) {
            setSelectedInterval("1D");
        }
    }, [selectedInterval]);

    return (
        <div>
            <div style={{ display: "flex", gap: "10px", padding: "10px", justifyContent: "center" }}>
                {["1D", "1W", "1M", "1Y", "ALL"].map((interval) => (
                    <button
                        key={interval}
                        onClick={() => setSelectedInterval(interval)}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "5px",
                            background: selectedInterval === interval ? "#ccc" : "#f4f4f4",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            fontWeight: selectedInterval === interval ? "bold" : "normal",
                        }}
                    >
                        {interval}
                    </button>
                ))}
            </div>
            <div ref={chartContainerRef} style={{ width: "100%", height: "400px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", padding: "10px" }} />
        </div>
    );
};

export default ChartComponent;