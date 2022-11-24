import { useMemo, useState, useContext, useEffect } from 'react';
import { WidgetsDataContext } from './contexts/WidgetsContext';
import { getTimeOfDayText } from './helpers';
import NameForm from './components/name-form';
import Widgets from './components/widgets';
import './styles/index.scss';
import styles from './App.module.scss';

function App() {
  const { userSettings, fetchedStatuses } = useContext(WidgetsDataContext);
  const timeOfDayText = useMemo(() => getTimeOfDayText(), []);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (Object.values(fetchedStatuses).every((status) => status === true)) {
      setIsReady(true);
    }
  }, [fetchedStatuses]);

  return (
    <>
      {/* Not using ternary operator as the flag relies on data in each widget */}
      {!isReady && <p>Loading...</p>}
      {userSettings.username === '' && <NameForm />}
      <div
        className={styles.App}
        style={{
          backgroundImage: `url(../public/imgs/bg/${timeOfDayText}.png`,
        }}
      >
        <div className={styles.bgOverlay}>
          <div className={styles.mainContainer}>
            <Widgets setIsReady={setIsReady} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
