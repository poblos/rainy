import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './themes'
import { Forecast } from './containers/forecast';
import { GlobalStyle } from './global-styles';
import { useState } from 'react';
import logo from './dark-mode.png';

export const App = () => {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (

    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyle />
        <button onClick={themeToggler}>
          <img src={logo} height="25px" width="25px" alt='themeSwitchIcon'></img>
        </button>
        <Forecast />
      </>
    </ThemeProvider>
  );
};