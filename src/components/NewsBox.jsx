import "../assets/styles/newsBox.css";
import { fetchNewsData } from "../utils";
import { LoadingSpinner } from "./";
import { newsPlaceholderImage } from "../assets/images/placeholder-images";

import { useState, useEffect } from "react";

const NewsBox = ({ lang, handleStateWebBrowser }) => {
  const [newsTopic, setNewsTopic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [actualNews, setActualNews] = useState(null);
  const [showActualNews, setShowActualNews] = useState(false);

  // fetch data at component start and change topic
  useEffect(() => {
    setIsLoading(true);
    fetchNewsData(lang.lngFetch, newsTopic, newsTopic)
      .then((data) => {
        setNewsData(data);
      })
      .catch((err) => {
        setFetchError(err);
      })
      .finally(setIsLoading(false));
  }, [newsTopic, lang.lngFetch]);

  const oneArticle = (data) => {
    const backgroundImage = data.urlToImage
      ? `url(${data.urlToImage})`
      : `url(${newsPlaceholderImage})`;

    return (
      <button
        key={data?.url}
        onClick={() => {
          setActualNews(data);
          setShowActualNews(true);
        }}
      >
        <div className="news-box-article" style={{ backgroundImage }}>
          <p>{data?.author}</p>
          <p>{data?.title}</p>
        </div>
      </button>
    );
  };

  return (
    <div className="news-box-wrapper">
      <div className="news-box">
        <div className="news-box-buttons">
          <button
            onClick={() => {
              setNewsTopic(lang.sport);
            }}
          >
            {lang.sport}
          </button>
          <button
            onClick={() => {
              setNewsTopic(lang.programming);
            }}
          >
            {lang.programming}
          </button>
          <button
            onClick={() => {
              setNewsTopic(lang.politic);
            }}
          >
            {lang.politic}
          </button>
          <button
            onClick={() => {
              setNewsTopic(lang.weather);
            }}
          >
            {lang.weather}
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : fetchError ? (
          <div className="news-box-error">{lang.fetchError}</div>
        ) : (
          <>{newsData?.data?.articles.map((item) => oneArticle(item))}</>
        )}
        {showActualNews && (
          <div className="news-box_actual-news">
            <p>{actualNews?.description}</p>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleStateWebBrowser("programEnabled", true);
                handleStateWebBrowser("defaultUrl", actualNews?.url);
              }}
            >
              {lang.link}
            </button>
            <button onClick={() => setShowActualNews(false)}>
              {lang.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsBox;
