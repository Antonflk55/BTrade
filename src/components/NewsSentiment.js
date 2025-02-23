import React, { useState, useEffect } from "react";

const NewsSentiment = ({ selectedStock, setGeneralNews }) => {
  const [newsSummary, setNewsSummary] = useState("Fetching latest financial news...");

  useEffect(() => {
    const fetchNewsFromAI = async () => {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "user", content: `You are a financial analyst. Fetch and summarize **ONLY the most relevant news** for the following:

              🔹 **Stock-Specific News**:
              - Fetch recent developments **exclusively** related to ${selectedStock}.
              - Prioritize earnings reports, product launches, CEO statements, stock movements, regulatory changes, and major company events.
              - Ignore general finance news that does not directly relate to ${selectedStock}.

              🔹 **Brief Market Overview**:
              - Summarize any major financial news impacting the broader market **in one or two sentences**.
              - This includes Federal Reserve decisions, tech sector performance, or major macroeconomic changes.

              **Response Format:**
              1️⃣ **Stock-Specific News** (For ${selectedStock}):
              - [List and summarize the most critical recent news related to ${selectedStock}.]
              
              2️⃣ **Market Overview** (Brief Summary):
              - [Summarize in one or two sentences.]` }
            ],
          }),
        });

        const data = await response.json();
        setNewsSummary(data.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching financial news from ChatGPT:", error);
        setNewsSummary("Error fetching news.");
      }
    };

    fetchNewsFromAI();
  }, [selectedStock]);

  return (
    <div className="bg-white p-4 shadow-lg rounded-md mt-4">
      <h3 className="text-lg font-bold">Latest Financial News</h3>
      <p className="mt-2">{newsSummary}</p>
    </div>
  );
};

export default NewsSentiment;