import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "./api";

const Logout = ({ setToken }) => {
  const navigate = useNavigate();

  userLogout();
  setToken(null);
  navigate("/");

  return null;
};

export default Logout;
