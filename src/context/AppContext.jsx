import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [data, setData] = useState({});
  const [switchTemperature, setSwitchTemperature] = useState(
    localStorage.getItem("switchTemperature") === "true"
  );
  const [switchDarkMode, setSwitchDarkMode] = useState(
    localStorage.getItem("switchDarkMode") === "true"
  );
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    localStorage.setItem("switchTemperature", switchTemperature);
    localStorage.setItem("switchDarkMode", switchDarkMode);
  }, [switchTemperature, switchDarkMode]);

  return (
    <AppContext.Provider value={{ data, setData, switchTemperature, setSwitchTemperature, switchDarkMode, setSwitchDarkMode, activeTab, setActiveTab }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };