import React, { useState } from 'react';
import styles from './styles.module.scss';

const EnableToggler = ({ isEnabled, handleChange, className }) => {
  const [isChecked, setIsChecked] = useState(isEnabled);

  const handleClick = () => {
    handleChange(!isChecked);
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={`${styles.togglerWrap} ${className}`}>
      <div
        className={`${styles.toggler} ${isChecked && styles.isChecked}`}
        onClick={handleClick}
      >
        <input
          type="checkbox"
          className={styles.togglerCircle}
          checked={isChecked}
          onChange={() => {
            console.log('value changing');
          }}
        />
      </div>
    </div>
  );
};

export default EnableToggler;
