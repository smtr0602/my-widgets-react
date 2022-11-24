import React, { useEffect, useMemo, useRef, useContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import { WidgetsDataContext } from '../../contexts/WidgetsContext';
import { getTimeOfDayText } from '../../helpers';
import EditToggler from './edit-toggler';
import WeatherWidget from './weather-widget';
import GreetingWidget from './greeting-widget';
import CurrencyRateWidget from './currency-rate-widget';
import NewsWidget from './news-widget';
import { LOCAL_STORAGE_KEY } from '../../data/constants';
import styles from './styles.module.scss';

const Widgets = () => {
  const { userSettings, setUserSettings, isEditMode } =
    useContext(WidgetsDataContext);
  const { getItem, setItem } = useLocalStorage();
  const timeOfDayText = useMemo(() => getTimeOfDayText(), []);

  useEffect(() => {
    const localStorageData = getItem(LOCAL_STORAGE_KEY);
    if (localStorageData) {
      setUserSettings(localStorageData);
    }
  }, []);

  // update local storage when edit mode is turned off
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    if (!isEditMode) {
      setItem(LOCAL_STORAGE_KEY, userSettings);
    }
  }, [isEditMode]);

  return (
    <>
      <EditToggler />
      <div className={styles.orderWrap}>
        <div className={styles.inlineWidgetsWrap}>
          <GreetingWidget timeOfDayText={timeOfDayText} />
          <div className={styles.smWidgetsWrap}>
            <CurrencyRateWidget />
          </div>
        </div>
        <WeatherWidget />
      </div>
      <NewsWidget />
    </>
  );
};

export default Widgets;
