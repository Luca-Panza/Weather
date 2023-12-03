import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

  const [data, setData] = useState({});
  const [switchTemperature, setSwitchTemperature] = useState(false);
  const [switchDarkMode, setSwitchDarkMode] = useState(false);

  return (
    <AppContext.Provider value={{ data, setData, switchTemperature, setSwitchTemperature, switchDarkMode, setSwitchDarkMode }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };