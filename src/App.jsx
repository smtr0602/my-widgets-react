import { useMemo, useState } from 'react';
import { getTimeOfDayText } from './helpers';
import Widgets from './components/widgets';
import './styles/index.scss';
import styles from './App.module.scss';

function App() {
  const timeOfDayText = useMemo(() => getTimeOfDayText(), []);
  const [isReady, setIsReady] = useState(false);

  return (
    <>
      {!isReady && <p>Loading...</p>}
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
