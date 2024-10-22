// LoadingContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import globalVars from '../app/globalVars';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(globalVars.getIsLoading());

  useEffect(() => {
    // Define a callback function that updates the loading state
    const updateLoadingState = (newLoadingState) => {
      setIsLoading(newLoadingState);
    };

    // Subscribe to loading state changes
    globalVars.subscribe(updateLoadingState);

    // Cleanup function to unsubscribe on component unmount
    return () => {
      globalVars.unsubscribe(updateLoadingState);
    };
  }, []);

  return (
    <LoadingContext.Provider value={isLoading}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
