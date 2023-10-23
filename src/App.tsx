import React from 'react';
import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import HeaderBar from './components/HeaderBar';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  button, a {
    all: unset;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    cursor: pointer;
    text-align: center;
  }

  li {
    list-style: none;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <HeaderBar />
      <Outlet />
    </>
  );
};

export default App;