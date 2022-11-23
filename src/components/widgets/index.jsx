import React, { useState, useEffect, useMemo } from 'react';
import { getTimeOfDayText } from '../../helpers';
import GreetingWidget from './greeting-widget';
import CurrencyRateWidget from './currency-rate-widget';
import styles from './styles.module.scss';

const Widgets = ({ setIsReady }) => {
  const [dataStatuses, setDataStatuses] = useState({
const Widgets = ({ widgetsData }) => {
    currencyRate: false,
  });
  const timeOfDayText = useMemo(() => getTimeOfDayText(), []);

  useEffect(() => {
    if (Object.values(dataStatuses).every((status) => status === true)) {
      setIsReady(true);
    }
  }, [dataStatuses]);

  return (
    <>
    <div className={styles.inlineWidgetsWrap}>
        <GreetingWidget
          timeOfDayText={timeOfDayText}
          setDataStatuses={setDataStatuses}
        />
        <div className={styles.smWidgetsWrap}>
          <CurrencyRateWidget setDataStatuses={setDataStatuses} />
        </div>
      </div>
    </>
  );
};

export default Widgets;
