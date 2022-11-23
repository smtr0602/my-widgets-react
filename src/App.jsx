import { useEffect, useMemo, useState } from 'react';
import { getTimeOfDayText } from './helpers';
import fetchAllWidgetsData from './services';
import GreetingWidget from './components/widgets/greeting';
import CurrencyRateWidget from './components/widgets/currency-rate';
import './styles/index.scss';
import styles from './App.module.scss';

function App() {
  const [widgetsData, setWidgetsData] = useState(null);
  const timeOfDayText = useMemo(() => getTimeOfDayText(), []);
  useEffect(() => {
    const newData = {};
    fetchAllWidgetsData().then((data) => {
      console.log(data);
      data.forEach((widgetData) => {
        const { value } = widgetData;
        newData[value.name] = value.data;
      });
      setWidgetsData(newData);
    });
  }, []);

  return (
    <>
      {widgetsData ? (
        <div
          className={styles.App}
          style={{
            backgroundImage: `url(../public/imgs/bg/${timeOfDayText}.png`,
          }}
        >
          <div className={styles.mainContainer}>
            <div className={styles.inlineWidgetsWrap}>
              <GreetingWidget
                widgetData={widgetsData.quote}
                timeOfDayText={timeOfDayText}
              />
              <div className={styles.smWidgetsWrap}>
                <CurrencyRateWidget widgetData={widgetsData.currencyRate} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default App;
