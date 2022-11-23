import React from 'react';
import styles from './styles.module.scss';

const GreetingWidget = ({ widgetData, timeOfDayText }) => {
  const greetingText = {
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'afternoon',
    night: 'evening',
  };

  return (
    <div
      className={`${styles.greetingWidget} ${
        timeOfDayText === 'night' && styles.night
      }`}
    >
      <h1>
        Good {greetingText[timeOfDayText]},
        <span>{import.meta.env.VITE_USER_NAME}!</span>
      </h1>
      <p className={styles.quote}>{widgetData}</p>
    </div>
  );
};

export default GreetingWidget;
