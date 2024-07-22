import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AppPaperScreen,
  LoginScreen,
  MasterScreen,
  SigninScreen,
  Attendance,
  ServiceScreen,
  SignupScreen,
  Logout,
  Testy,
  IndividualService,
  ReportScreen,
  HealthDataAnalyzer,
  FaceDetection,
  UploadVer1,
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
          <Route path="/testy/:userPK" element={<Testy />} />
          <Route path="/report/:userPK" element={<ReportScreen />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="/:eduPK/members" element={<IndividualService />} />
          <Route path="/api/edu/:eduPK/members" element={<IndividualService />} />
          <Route path="/upload" element={<UploadVer1 />} />
          <Route path="/analyze" element={<HealthDataAnalyzer />} />
          <Route path="/face-detection" element={<FaceDetection />} />
        </Routes>
      </AppPaperScreen>
    </BrowserRouter>
  );
};

export default App;
