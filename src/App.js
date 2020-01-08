import React, { useState, useEffect } from 'react';

import View from './components/View/View';
import { ContextProvider } from './components/Context/Context';
import themes from './themes';
import useLocalStorage from './useLocalStorage';
import propData from './data';

const setTheme = (theme) => {
  theme.forEach(item => {
    document.documentElement.style.setProperty(Object.keys(item), Object.values(item))
  })
}

const App = () => {
  const [data, setData] = useState(propData);
  const [darkmode, setDarkmode] = useLocalStorage("theme", true);

  useEffect(() => {
    if (darkmode) setTheme(themes.dark)
    else setTheme(themes.light)
  }, [darkmode])

  return (
    <ContextProvider value={{ darkmode, setDarkmode }}>
      <View data={data} setData={setData} />
    </ContextProvider>
  );
}

export default App;
