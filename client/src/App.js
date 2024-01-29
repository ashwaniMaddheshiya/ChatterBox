import React, { useContext } from "react";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AuthContext from "./context/AuthContext";

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        {!token && <Route path="/" element={<Navigate to="/signin" />} />}

        {token && <Route path="/" element={<Home />} />}

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
