import { useState } from 'react';

const useLocalStorage = () => {
  const [items, setItems] = useState({});

  const getItem = (key) => {
    if (Object.keys(items).includes(key)) {
      return items[key];
    }
    return JSON.parse(localStorage.getItem(key));
  };

  const setItem = (key, value) => {
    setItems((prev) => ({ ...prev, key: value }));
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { getItem, setItem };
};

export default useLocalStorage;
