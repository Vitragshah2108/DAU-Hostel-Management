import React, { createContext, useMemo, useState, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';

export const ThemeContext = createContext({
  mode: 'light',
  toggle: () => {},
});

export const AppThemeProvider = ({ children }) => {
  const [mode] = useState('light');
  const toggle = () => {};
  const value = useMemo(() => ({ mode, toggle }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);


