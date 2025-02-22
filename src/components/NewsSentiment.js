import React, { useState, useEffect } from "react";

const NewsSentiment = ({ selectedStock, setGeneralNews }) => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNewsFromAI = async () => {
      setNews("Loading news...");
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
              { role: "user", content: `Fetch and summarize the most relevant financial news.

              **Stock-Specific News for ${selectedStock}:**
              - Only include recent developments directly related to ${selectedStock}.
              - Prioritize earnings reports, product launches, regulatory changes, and stock movements.

              **Brief Market Overview:**
              - Summarize any major financial news impacting the broader market (e.g., Federal Reserve decisions, tech sector performance, global economic events).
              
              **Response Format (Bullet Points):**
              - **Stock-Specific News:**  
                - [Summarize key events related to ${selectedStock}]
              - **Market Overview (Brief Summary):**  
                - [Summarize global financial events in 1-2 sentences]` }
            ],
          }),
        });

        const data = await response.json();
        setNews(data.choices[0].message.content);
        setGeneralNews(data.choices[0].message.content);
      } catch (error) {
        console.error("Error fetching financial news from ChatGPT:", error);
        setNews("Error fetching news.");
      }
    };

    fetchNewsFromAI();
  }, [selectedStock]);

  return (
    <div className="bg-white p-4 shadow-lg rounded-md mt-4">
      <h3 className="text-lg font-bold">Latest Financial News</h3>
      {news ? (
        <ul className="mt-2 list-disc pl-5">
          {news.split("\n").map((line, index) => (
            <li key={index}>{line}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Loading news...</p>
      )}
    </div>
  );
};

export default NewsSentiment;