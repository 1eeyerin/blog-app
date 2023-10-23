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
    cursor: pointer;
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