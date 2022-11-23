import React, { useState, useEffect, useMemo } from 'react';
import { getTimeOfDayText } from '../../helpers';
import WeatherWidget from './weather-widget';
import GreetingWidget from './greeting-widget';
import CurrencyRateWidget from './currency-rate-widget';
import NewsWidget from './news-widget';
import styles from './styles.module.scss';

const Widgets = ({ setIsReady }) => {
  const [dataStatuses, setDataStatuses] = useState({
    weather: false,
    greeting: false,
    currencyRate: false,
    news: false,
  });
  const timeOfDayText = useMemo(() => getTimeOfDayText(), []);

  useEffect(() => {
    if (Object.values(dataStatuses).every((status) => status === true)) {
      setIsReady(true);
    }
  }, [dataStatuses]);

  return (
    <>
      <div className={styles.orderWrap}>
        <div className={styles.inlineWidgetsWrap}>
          <GreetingWidget
            timeOfDayText={timeOfDayText}
            setDataStatuses={setDataStatuses}
          />
          <div className={styles.smWidgetsWrap}>
            <CurrencyRateWidget setDataStatuses={setDataStatuses} />
          </div>
        </div>
        <WeatherWidget setDataStatuses={setDataStatuses} />
      </div>
      <NewsWidget setDataStatuses={setDataStatuses} />
    </>
  );
};

export default Widgets;
