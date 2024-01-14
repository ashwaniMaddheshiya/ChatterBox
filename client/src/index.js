import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/AuthContextProvider";
import UserContextProvider from "./context/UserContextProvider";
// import { SocketProvider } from "./context/SocketProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthContextProvider>
      <UserContextProvider>
        {/* <SocketProvider> */}
        <App />
        {/* </SocketProvider> */}
      </UserContextProvider>
    </AuthContextProvider>
  </Router>
);
