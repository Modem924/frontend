import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import {
  AppPaperScreen,
  LoginScreen,
  MasterScreen,
  SigninScreen,
  ServiceScreen,
  SignupScreen,
  Logout,
  IndividualService,
  ReportScreen,
  HealthDataAnalyzer,
  FaceDetection,
  UploadVer1,
  WorkerScreen,
  Attendancestyle,
} from "./components";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [grantedAuthorities, setGrantedAuthorities] = useState(
    localStorage.getItem("grantedAuthorities")
  );
  const navigate = useNavigate();
  useEffect(() => {
    // grantedAuthorities 값 출력
    console.log("Granted Authorities:", grantedAuthorities);

    // if (grantedAuthorities) {
    //   if (grantedAuthorities === "Master") {
    //     navigate("/master");
    //   }
    //   if (grantedAuthorities === "Worker") {
    //     navigate("/service");
    //   }
    //   if (grantedAuthorities === "Member") {
    //     navigate("/report/:userPK");
    //   } else {
    //     navigate("/");
    //   }
    // }
  }, [grantedAuthorities, navigate]);
  return (
    <BrowserRouter>
      <AppPaperScreen>
        <Routes>
          <Route
            path="/"
            element={
              <LoginScreen
                setToken={setToken}
                setGrantedAuthorities={setGrantedAuthorities}
              />
            }
          />
          <Route path="/master" element={<MasterScreen />} />
          <Route path="/signin" element={<SigninScreen />} />
          <Route path="/service" element={<ServiceScreen />} />
          <Route path="/signupscreen" element={<SignupScreen />} />
          <Route path="/report/:userPK" element={<ReportScreen />} />
          <Route path="/logout" element={<Logout setToken={setToken} />} />
          <Route path="/:eduPK/members" element={<IndividualService />} />
          <Route path="/upload" element={<UploadVer1 />} />
          <Route path="/analyze" element={<HealthDataAnalyzer />} />
          <Route path="/face-detection" element={<FaceDetection />} />
          <Route path="/workerscreen" element={<WorkerScreen />} />
          <Route path="/attendance" element={<Attendancestyle />} />
        </Routes>
      </AppPaperScreen>
    </BrowserRouter>
  );
};

export default App;
