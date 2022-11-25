import React, { useState, useEffect, useContext } from 'react';
import { WidgetsDataContext } from '../../../contexts/WidgetsContext';
import { fetchSingleWidgetData } from '../../../services';
import WidgetWrapper from '../widget-wrapper';
import greetingStyles from './styles.module.scss';

const GreetingWidget = ({ timeOfDayText }) => {
  const { setFetchedStatuses, userSettings, setUserSettings, isEditMode } =
    useContext(WidgetsDataContext);
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
      setFetchedStatuses((prev) => ({ ...prev, greeting: true }));
    });
  }, []);

  const resetUsername = () => {
    setUserSettings((prev) => ({ ...prev, username: '' }));
  };

  return (
    <WidgetWrapper
      name="greeting"
      widgetData={widgetData}
      className={timeOfDayText === 'night' && greetingStyles.night}
      isEnabled={userSettings.greeting}
    >
      {(data, styles) => (
        <>
          <h1>
            Good {greetingText[timeOfDayText]},
            <span
              onClick={resetUsername}
              className={`${isEditMode ? styles.isEditMode : ''}`}
            >
              {userSettings.username || 'Guest'}!
            </span>
          </h1>
          <p className={styles.quote}>{data}</p>
        </>
      )}
    </WidgetWrapper>
  );
};

export default GreetingWidget;
