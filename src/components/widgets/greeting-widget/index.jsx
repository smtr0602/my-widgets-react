import React, { useState, useEffect } from 'react';
import { fetchSingleWidgetData } from '../../../services';
import WidgetWrapper from '../widget-wrapper';

const GreetingWidget = ({ setDataStatuses, timeOfDayText }) => {
  const [widgetData, setWidgetData] = useState(null);
  const greetingText = {
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'afternoon',
    night: 'evening',
  };
  const axiosOptions = {
    method: 'POST',
    url: import.meta.env.VITE_QUOTE_API_URL,
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
      'X-RapidAPI-Host': 'motivational-quotes1.p.rapidapi.com',
    },
    timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
  };
  useEffect(() => {
    fetchSingleWidgetData(axiosOptions).then((data) => {
      setWidgetData(data);
      setDataStatuses((prev) => ({ ...prev, greeting: true }));
    });
  }, []);

  return (
    <WidgetWrapper
      name="greeting"
      widgetData={widgetData}
      className={timeOfDayText === 'night' && styles.night}
    >
      {(data, styles) => (
        <>
          <h1>
            Good {greetingText[timeOfDayText]},
            <span>{import.meta.env.VITE_USER_NAME}!</span>
          </h1>
          <p className={styles.quote}>{data}</p>
        </>
      )}
    </WidgetWrapper>
  );
};

export default GreetingWidget;
