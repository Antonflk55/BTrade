import React, { useState, useEffect } from "react";

const AIInsights = ({ selectedStock, indicators, generalNews }) => {
  const [insights, setInsights] = useState("Loading AI insights...");

  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        // Ensure generalNews is an array before using map()
        const newsSummaries = Array.isArray(generalNews)
          ? generalNews.map((article) => article.title).join("\n")
          : "No major news available.";

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "user", content: `You are a financial analyst. Generate detailed stock market insights based on technical indicators and financial news.
              
              **Technical Indicators:**
              - EMA 50: ${indicators?.EMA_50 || "Estimate based on trend"}
              - EMA 200: ${indicators?.EMA_200 || "Estimate based on long-term trend"}
              - RSI: ${indicators?.RSI || "Estimate based on price action"}
              - MACD: ${indicators?.MACD || "Estimate based on momentum"}
              - MACD Signal: ${indicators?.MACD_Signal || "Estimate based on market trend"}

              **Latest Financial News Impact:**
              ${newsSummaries}

              **Instructions:**
              - Analyze how the provided financial news impacts the market.
              - Cross-reference with technical indicators.
              - Provide a clear **Buy/Sell/Hold** recommendation.
              - Make definitive statements (do **not** use "likely" or "possibly").
              - Conclude with a **10-day market prediction**.

              **Format your response with bold section titles and bullet points.**
              ` }
            ],
          }),
        });

        const data = await response.json();
        setInsights(data.choices[0]?.message?.content || "No insights available.");
      } catch (error) {
        console.error("Error fetching AI insights:", error);
        setInsights("Error generating AI insights.");
      }
    };

    fetchAIInsights();
  }, [selectedStock, indicators, generalNews]);

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mt-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Market Insights</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-700">
        {insights.split("\n").map((line, index) => (
          line.trim() !== "" ? <li key={index}>{line}</li> : null
        ))}
      </ul>
    </div>
  );
};

export default AIInsights;