import React, { useContext } from 'react';
import { WidgetsDataContext } from '../../../contexts/WidgetsContext';
import styles from './styles.module.scss';

const EditToggler = ({ className }) => {
  const { isEditMode, setIsEditMode } = useContext(WidgetsDataContext);

  const handleClick = () => {
    setIsEditMode((prev) => !prev);
  };

  return (
    <div className={`${styles.togglerWrap} ${className}`}>
      <div
        className={`${styles.toggler} ${isEditMode && styles.isChecked}`}
        onClick={handleClick}
      >
        <input
          type="checkbox"
          className={styles.togglerCircle}
          checked={isEditMode}
          onChange={() => {
            console.log('value changing');
          }}
        />
      </div>
    </div>
  );
};

export default EditToggler;
