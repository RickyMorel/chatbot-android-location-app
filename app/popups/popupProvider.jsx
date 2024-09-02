import React, { createContext, useState, useContext } from 'react';
import GenericPopup from './GenericPopup';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [currentPopup, setCurrentPopup] = useState(null);

  const showPopup = (error) => {
    const closePopupFunc = () => setCurrentPopup(null);
    const popupHtml = <GenericPopup closeFunc={closePopupFunc} errorMsg={error} />;
    setCurrentPopup(popupHtml);
  };

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      {currentPopup}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  return useContext(PopupContext);
};
