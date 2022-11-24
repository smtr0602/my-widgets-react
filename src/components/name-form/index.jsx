import React, { useContext, useState } from 'react';
import { WidgetsDataContext } from '../../contexts/WidgetsContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY, NAME_MAX_LENGTH } from '../../data/constants';
import styles from './styles.module.scss';

const NameForm = () => {
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
    <div className={styles.nameForm}>
      <div className={styles.nameFormInner}>
        <h1>Choose a Nickname</h1>
        <p className={styles.errorMsg}>{errorMsg}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Enter here" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default NameForm;
