import React from 'react';
import { format } from 'date-fns';
import widgetStyles from '../styles.module.scss';
import styles from './styles.module.scss';

const CurrencyRateWidget = ({ widgetData }) => {
  const fromValInt = widgetData.info.rate.toString().split('.')[0];
  const fromValDecimal = widgetData.info.rate.toString().split('.')[1];

  return (
    <div className={`${styles.currencyRateWidget} ${widgetStyles.widgetItem}`}>
      <p className={styles.currencyFrom}>
        {Number(widgetData.query.amount).toFixed(2)} Canadian Dollar =
      </p>
      <p className={styles.currencyTo}>
        {fromValInt}
        <span className={styles.currencyDecimal}>.{fromValDecimal}</span>{' '}
        Japanese Yen
      </p>
      <p className={styles.currencyTime}>
        Updated at: {format(widgetData.info.timestamp * 1000, 'MM/dd HH:mm')}
      </p>
    </div>
  );
};

export default CurrencyRateWidget;
