import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WidgetsDataContext } from '../../contexts/WidgetsContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY, NAME_MAX_LENGTH } from '../../data/constants';
import styles from './styles.module.scss';

const NameForm = ({ isShown }) => {
  const { setUserSettings } = useContext(WidgetsDataContext);
  const { setItem } = useLocalStorage();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.name.value.trim();
    const error = errorMessage(username);
    if (error) {
      setErrorMsg(error);
      return;
    }
    setUserSettings((prev) => {
      setItem(LOCAL_STORAGE_KEY, { ...prev, username });
      return { ...prev, username };
    });
  };

  const errorMessage = (name) => {
    if (name === '') {
      return 'Please enter a nickname!';
    }
    if (name.length > NAME_MAX_LENGTH) {
      return `Name cannot be more than ${NAME_MAX_LENGTH} characters!`;
    }
  };

  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: 'easeOut',
            duration: 0.1,
          }}
          className={styles.nameForm}
        >
          <div className={styles.nameFormInner}>
            <h1>Choose a Nickname</h1>
            <p className={styles.errorMsg}>{errorMsg}</p>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Enter here" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NameForm;
