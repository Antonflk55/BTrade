import React, { useState, useEffect } from "react";

const AIInsights = ({ selectedStock, indicators, newsSentiment }) => {
  const [insights, setInsights] = useState("Generating AI insights...");
  
  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "user", content: `Analyze this data and provide a summary, buy/sell/hold recommendation, and a 10-day price prediction:
              
              - Stock: ${selectedStock}
              - EMA 50: ${indicators?.ema50}
              - EMA 200: ${indicators?.ema200}
              - RVI: ${indicators?.rvi}
              - Ichimoku Cloud: ${indicators?.ichimoku}
              - Keltner Channels: ${indicators?.keltner}
              - OBV: ${indicators?.obv}
              - News Sentiment: ${newsSentiment}

              Format response as:
              1️⃣ Summary: [summary]
              2️⃣ Recommendation: [Buy/Sell/Hold]
              3️⃣ 10-Day Price Prediction: [prediction]
              ` }
            ],
          }),
        });

        const data = await response.json();
        setInsights(data.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching AI insights:", error);
        setInsights("Error fetching AI insights.");
      }
    };

    fetchAIInsights();
  }, [selectedStock, indicators, newsSentiment]);

  return (
    <div className="bg-blue-100 p-4 shadow-lg rounded-md mt-4">
      <h3 className="text-lg font-bold">AI Trading Insights</h3>
      <p className="text-gray-700 mt-2">{insights}</p>
    </div>
  );
};

export default AIInsights;