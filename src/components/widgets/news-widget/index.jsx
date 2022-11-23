import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { fetchSingleWidgetData } from '../../../services';
import widgetStyles from '../styles.module.scss';
import styles from './styles.module.scss';

// library.add(faArrowUpRightFromSquare);

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
      console.log(articles);
      setWidgetData(articles);
      setDataStatuses((prev) => ({ ...prev, news: true }));
    });
  }, []);

  return (
    <>
      {widgetData && (
        <div className={`${styles.newsWidget} ${widgetStyles.widgetItem}`}>
          <div className={styles.newsInner}>
            <ul>
              {widgetData.map((article, i) => (
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
        </div>
      )}
    </>
  );
};

export default NewsWidget;
