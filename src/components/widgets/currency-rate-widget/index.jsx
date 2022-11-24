import React, { useState, useEffect, useContext } from 'react';
import { format } from 'date-fns';
import { WidgetsDataContext } from '../../../contexts/WidgetsContext';
import { fetchSingleWidgetData } from '../../../services';
import WidgetWrapper from '../widget-wrapper';

const CurrencyRateWidget = () => {
  const { setFetchedStatuses, userSettings } = useContext(WidgetsDataContext);
  const [widgetData, setWidgetData] = useState(null);
  const fromValInt = widgetData?.info.rate.toString().split('.')[0];
  const fromValDecimal = widgetData?.info.rate.toString().split('.')[1];

  const axiosOptions = {
    method: 'GET',
    url: import.meta.env.VITE_EXCHANGE_RATES_API_URL,
    // vancouver location
    params: { to: 'JPY', from: 'CAD', amount: 1 },
    headers: {
      apikey: import.meta.env.VITE_EXCHANGE_RATES_API_KEY,
    },
    timeout: import.meta.env.VITE_AXIOS_TIMEOUT,
  };
  useEffect(() => {
    fetchSingleWidgetData(axiosOptions).then((data) => {
      setWidgetData(data);
      setFetchedStatuses((prev) => ({ ...prev, currencyRate: true }));
    });
  }, []);

  return (
    <WidgetWrapper
      name="currencyRate"
      widgetData={widgetData}
      isEnabled={userSettings.currencyRate}
    >
      {(data, styles) => (
        <>
          <p className={styles.currencyFrom}>
            {Number(data.query.amount).toFixed(2)} Canadian Dollar =
          </p>
          <p className={styles.currencyTo}>
            {fromValInt}
            <span className={styles.currencyDecimal}>.{fromValDecimal}</span>
            Japanese Yen
          </p>
          <p className={styles.currencyTime}>
            Updated at: {format(data.info.timestamp * 1000, 'MM/dd HH:mm')}
          </p>
        </>
      )}
    </WidgetWrapper>
  );
};

export default CurrencyRateWidget;
