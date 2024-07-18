import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { SnackbarProvider } from 'notistack';
import {
  AppPaperScreen,
  LoginScreen,
  MasterScreen,
  SigninScreen,
  Attendance,
  ServiceScreen,
  SignupScreen,
  Logout,
  Testy
} from "./components";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <AppPaperScreen>
        <Routes>
          <Route path="/" element={<LoginScreen setToken={setToken} />} />
          <Route path="/master" element={<MasterScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/service" element={<ServiceScreen />} />
          <Route path="/signupscreen" element={<SignupScreen />} />
          <Route path="/testy" element={<Testy />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
        </Routes>
      </AppPaperScreen>
    </BrowserRouter>
  );
};

export default App;
