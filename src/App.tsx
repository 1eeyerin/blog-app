import Router from "components/Router";
import React, { useEffect, useState } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "components/Loader";
import { createGlobalStyle } from "styled-components";
import { AuthContextProvider } from "context/AuthContext";

const App = () => {
  const auth = getAuth(app);

  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth]);

  return (
    <AuthContextProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <GlobalStyle />
      {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
    </AuthContextProvider>
  );
};

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

export default App;
