import React, { useState, useEffect } from "react";

const NewsSentiment = ({ selectedStock }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${selectedStock}&apiKey=${process.env.REACT_APP_NEWSAPI_KEY}`
        );
        const data = await response.json();
        setNews(data.articles.slice(0, 5)); // Show only the top 5 news articles
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, [selectedStock]);

  return (
    <div className="bg-white p-4 shadow-lg rounded-md mt-4">
      <h3 className="text-lg font-bold">Latest News</h3>
      {news.length > 0 ? (
        <ul className="mt-2">
          {news.map((article, index) => (
            <li key={index} className="mb-2">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {article.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Loading news...</p>
      )}
    </div>
  );
};

export default NewsSentiment;