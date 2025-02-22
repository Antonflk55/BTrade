import React, { useState, useEffect } from "react";

const AIInsights = ({ selectedStock, indicators, generalNews }) => {
  const [insights, setInsights] = useState("Loading AI insights...");

  useEffect(() => {
    const fetchAIInsights = async () => {
      try {
        // Ensure generalNews is always an array before calling map()
        const newsSummaries = Array.isArray(generalNews)
          ? generalNews.map((article) => `- ${article.title}`).join("\n")
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
              { role: "user", content: `You are a financial analyst. Generate a detailed stock market insight based on technical indicators and financial news.

              **Technical Indicators Available:**
              - EMA 50: ${indicators?.EMA_50 || "Estimate based on trend"}
              - EMA 200: ${indicators?.EMA_200 || "Estimate based on long-term trend"}
              - RSI: ${indicators?.RSI || "Estimate based on price action"}
              - MACD: ${indicators?.MACD || "Estimate based on momentum"}
              - MACD Signal: ${indicators?.MACD_Signal || "Estimate based on market trend"}

              **Latest Financial News Impact:**
              ${newsSummaries}

              **Instructions:**
              - Analyze the provided financial news and determine its impact on market conditions.
              - Cross-reference the news impact with available technical indicators.
              - Provide a clear Buy/Sell/Hold recommendation based on the combined analysis.
              - Make definitive statements (do not use "likely" or "possibly").
              - Conclude with a 10-day stock market prediction.

              **Format your response using bullet points:**
              - **Stock Market Summary:** Explain trends using indicators & news impact.
              - **Market Sentiment & Recommendation:** Explain whether conditions favor Buying, Selling, or Holding.
              - **10-Day Market Prediction:** Predict future market movement using news & technical data.` }
            ],
          }),
        });

        const data = await response.json();
        setInsights(data.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching AI insights:", error);
        setInsights("Error generating AI insights.");
      }
    };

    fetchAIInsights();
  }, [selectedStock, indicators, generalNews]);

  return (
    <div className="bg-white p-4 shadow-lg rounded-md mt-4">
      <h3 className="text-lg font-bold">Market Insights</h3>
      <ul className="mt-2 list-disc pl-5">
        {insights.split("\n").map((line, index) => (
          <li key={index}>{line}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIInsights;