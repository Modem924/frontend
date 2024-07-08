import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { SnackbarProvider } from 'notistack';
import {
  AppPaperScreen,
  LoginScreen,
  MasterScreen,
  SigninScreen,
  Attendance
} from './components';

const App = () => {
  return (
    <BrowserRouter>
      <AppPaperScreen>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/master" element={<MasterScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </AppPaperScreen>
    </BrowserRouter>
  );
};

export default App;
