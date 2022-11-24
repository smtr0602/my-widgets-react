import { createContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../data/constants';

export const WidgetsDataContext = createContext();

export const WidgetsDataProvider = ({ children }) => {
  const { getItem } = useLocalStorage();
  const [isEditMode, setIsEditMode] = useState(false);
  const [fetchedStatuses, setFetchedStatuses] = useState({
    weather: false,
    greeting: false,
    currencyRate: false,
    news: false,
  });
  const localStorageData = getItem(LOCAL_STORAGE_KEY);
  const [userSettings, setUserSettings] = useState(
    localStorageData || {
      username: '',
      weather: true,
      greeting: true,
      currencyRate: true,
      news: true,
    }
  );

  const value = {
    isEditMode,
    setIsEditMode,
    fetchedStatuses,
    setFetchedStatuses,
    userSettings,
    setUserSettings,
  };
  return (
    <WidgetsDataContext.Provider value={value}>
      {children}
    </WidgetsDataContext.Provider>
  );
};
