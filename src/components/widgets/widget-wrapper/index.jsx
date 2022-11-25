import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WidgetsDataContext } from '../../../contexts/WidgetsContext';
import camelToKebabCase from '../../../utils/camelToKebabCase';
import styles from './styles.module.scss';
import EnableToggler from '../enable-toggler';

const WidgetWrapper = ({
  name,
  widgetData,
  className,
  isEnabled,
  children,
}) => {
  const { setUserSettings, isEditMode } = useContext(WidgetsDataContext);
  const [widgetStyles, setWidgetStyles] = useState(null);

  useEffect(() => {
    importAndSetWidgetStyles();
  }, []);

  const importAndSetWidgetStyles = async () => {
    const theme = await import(
      `../${camelToKebabCase(name)}-widget/styles.module.scss`
    );
    setWidgetStyles(theme);
  };

  const handleChange = (status) => {
    setUserSettings((prev) => ({ ...prev, [name]: status }));
  };

  const isShown = () => {
    if (isEditMode) return true;
    return widgetData && isEnabled && widgetStyles;
  };

  return (
    <AnimatePresence>
      {isShown() && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{
            ease: 'easeOut',
          }}
          className={`${styles.widgetItem} ${widgetStyles[`${name}Widget`]} ${
            className ? className : ''
          } ${isEnabled ? styles.isEnabled : ''} ${
            isEditMode ? styles.isEditMode : ''
          }`}
        >
          {children(widgetData, widgetStyles)}
          {isEditMode && (
            <EnableToggler
              isEnabled={isEnabled}
              className={styles.toggler}
              handleChange={handleChange}
              setUserSettings={setUserSettings}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WidgetWrapper;
