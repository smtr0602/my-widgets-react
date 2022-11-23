import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { fetchSingleWidgetData } from '../../../services';
import WidgetWrapper from '../widget-wrapper';

const NewsWidget = ({ setDataStatuses }) => {
  const [widgetData, setWidgetData] = useState(null);

  useEffect(() => {
    const axiosOptions = {
      method: 'GET',
      url: import.meta.env.VITE_NEWS_API_URL,
      params: {
        country: 'jp',
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
        pageSize: 100,
      },
      timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
    };
    fetchSingleWidgetData(axiosOptions).then(({ articles }) => {
      setWidgetData(articles);
      setDataStatuses((prev) => ({ ...prev, news: true }));
    });
  }, []);

  return (
    <WidgetWrapper name="news" widgetData={widgetData}>
      {(data, styles) => (
        <div className={styles.newsInner}>
          <ul>
            {data.map((article, i) => (
              <li className={styles.newsItem} key={i}>
                <img src={article.urlToImage} alt={article.title} />
                <div className={styles.newsContent}>
                  <div className={styles.newsLinkBg}>
                    <a href={article.url} target="_blank">
                      <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                    </a>
                  </div>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </WidgetWrapper>
  );
};

export default NewsWidget;
