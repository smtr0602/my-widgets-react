import React, { useState, useEffect } from 'react';
import camelToKebabCase from '../../../utils/camelToKebabCase';
import styles from './styles.module.scss';
import WidgetShownToggler from '../widget-shown-toggler';

const WidgetWrapper = ({ name, widgetData, className, children }) => {
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

  return (
    <>
      {widgetData && widgetStyles && (
        <div
          className={`${styles.widgetItem} ${widgetStyles[`${name}Widget`]} ${
            className ? className : ''
          }`}
        >
          {children(widgetData, widgetStyles)}
          <WidgetShownToggler className={styles.toggler} />
        </div>
      )}
    </>
  );
};

export default WidgetWrapper;
