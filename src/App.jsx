import { useEffect, useMemo, useState } from 'react';
import { getTimeOfDayText } from './helpers';
import fetchAllWidgetsData from './services';
import Widgets from './components/widgets';
import './styles/index.scss';
import styles from './App.module.scss';

function App() {
  const timeOfDayText = useMemo(() => getTimeOfDayText(), []);
  const [widgetsData, setWidgetsData] = useState(null);
  useEffect(() => {
    const newWidgetsData = {};
    fetchAllWidgetsData().then((dataArr) => {
      dataArr.forEach((widgetData) => {
        const { value } = widgetData;
        newWidgetsData[value.name] = value.data;
      });
      setWidgetsData(newWidgetsData);
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
            <Widgets widgetsData={widgetsData} />
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}

export default App;
