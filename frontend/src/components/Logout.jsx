import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "./api";

const Logout = ({ setToken }) => {
  const navigate = useNavigate();
  alert("로그아웃 하시겠습니까?");

  userLogout();
  setToken(null);
  navigate("/");

  return null;
};

export default Logout;
