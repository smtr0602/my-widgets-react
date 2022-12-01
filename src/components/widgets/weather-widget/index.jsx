import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { WidgetsDataContext } from '../../../contexts/WidgetsContext';
import { fetchSingleWidgetData } from '../../../services';
import { getCurrentLocation } from '../../../helpers';
import WidgetWrapper from '../widget-wrapper';

const WeatherWidget = () => {
  const { setFetchedStatuses, userSettings } = useContext(WidgetsDataContext);
  const [widgetData, setWidgetData] = useState(null);

  useEffect(() => {
    getCurrentLocation().then(({ latitude, longitude }) => {
      // vancouver location
      const defaultLocation = {
        lat: import.meta.env.VITE_DEFAULT_LATITUDE,
        lon: import.meta.env.VITE_DEFAULT_LONGITUDE,
      };
      const axiosOptions = {
        method: 'GET',
        url: import.meta.env.VITE_WEATHER_API_URL,
        params: {
          lat: latitude || defaultLocation.lat,
          lon: longitude || defaultLocation.lon,
        },
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com',
        },
        timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
      };
      fetchSingleWidgetData(axiosOptions).then((data) => {
        setWidgetData(data);
        setFetchedStatuses((prev) => ({ ...prev, weather: true }));
      });
    });
  }, []);

  const todaysList = () => {
    if (!widgetData) return [];
    const todaysDate = format(
      new Date(widgetData.data[0].timestamp_local),
      'dd'
    );
    return widgetData.data.filter((item) => {
      return (
        format(new Date(item.timestamp_local), 'dd') < parseInt(todaysDate) + 3
      );
    });
  };

  return (
    <WidgetWrapper
      name="weather"
      widgetData={widgetData}
      isEnabled={userSettings.weather}
    >
      {(data, styles) => (
        <>
          <p className={styles.weatherLocation}>
            Weather in: {data.city_name} (timezone:
            {data.timezone})
          </p>
          <ul>
            {todaysList().length &&
              todaysList().map((item) => (
                <li key={item.datetime}>
                  <p className={styles.weatherDate}>
                    {format(new Date(item.timestamp_local), 'MM/dd')}
                  </p>
                  <p className={styles.weatherTime}>
                    {format(new Date(item.timestamp_local), 'h:mm')}
                    <span className={styles.unit}>
                      {format(new Date(item.timestamp_local), "aaaaa'm'")}
                    </span>
                  </p>
                  <p className={styles.weatherTemp}>
                    {item.temp}
                    <span className={styles.unit}>°C</span>
                  </p>
                  <img
                    src={`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`}
                  />
                  <p className={styles.weatherDesc}>
                    {item.weather.description}
                  </p>
                </li>
              ))}
          </ul>
        </>
      )}
    </WidgetWrapper>
  );
};

export default WeatherWidget;
