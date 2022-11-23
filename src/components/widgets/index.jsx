import React, { useMemo } from 'react';
import { getTimeOfDayText } from '../../helpers';
import GreetingWidget from './greeting-widget';
import CurrencyRateWidget from './currency-rate-widget';
import styles from './styles.module.scss';

const Widgets = ({ widgetsData }) => {
  const timeOfDayText = useMemo(() => getTimeOfDayText(), []);

  return (
    <div className={styles.inlineWidgetsWrap}>
      <GreetingWidget
        widgetData={widgetsData.quote}
        timeOfDayText={timeOfDayText}
      />
      <div className={styles.smWidgetsWrap}>
        <CurrencyRateWidget widgetData={widgetsData.currencyRate} />
      </div>
    </div>
  );
};

export default Widgets;
