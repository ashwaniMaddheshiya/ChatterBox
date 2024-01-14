import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

axios.defaults.baseURL = process.env.SERVER_URL;
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default App;
