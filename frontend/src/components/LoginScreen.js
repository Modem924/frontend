import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";

const LoginScreen = ({ setToken }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // 오류 상태 추가
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); //기본 폼 제출 동작 막기
    try {
      console.log("Sending login request...");
      console.log(id, password);
      const data = await login(id, password);
      console.log(data);
      const { accessToken } = data;
      const { grantedAuthorities } = data; //유저 auth
      console.log("grantedAuthorities : ", grantedAuthorities);
      //로컬에 토큰 저장
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("username", id);
      //애플리케이션에서 관리용 토큰
      setToken(data.accessToken);
      setError("");

      if (accessToken) {
        alert("Login successful");
        navigate("/master");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      setError("error, please try again.");
    }
  }; //handleLogin

  const styles = {
    body: {
      backgroundColor: "#DDE1E6",
      margin: 0,
      fontFamily: "Arial, sans-serif",
    },
    loginContainer: {
      width: "300px",
      margin: "100px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#DDE1E6",
      textAlign: "center",
    },
    logo: {
      width: "200px",
      marginBottom: "20px",
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    input: {
      width: "calc(100% - 10px)",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "3px",
    },
    buttonGroup: {
      marginTop: "20px",
    },
    button: {
      width: "100%",
      padding: "8px",
      border: "none",
      borderRadius: "3px",
      backgroundColor: "#6890cb",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "10px",
    },
    buttonHover: {
      backgroundColor: "#697077",
    },
  };

  return React.createElement(
    "div",
    { style: styles.loginContainer },
    React.createElement("img", {
      src: `${process.env.PUBLIC_URL}/DSTJ_logo.png`,
      alt: "Logo",
      style: styles.logo,
    }),
    React.createElement("h2", { style: styles.heading }, "Login"),
    React.createElement(
      "form",
      null,
      React.createElement(
        "div",
        { style: styles.inputGroup },
        React.createElement("input", {
          type: "text",
          value: id,
          onChange: (e) => setId(e.target.value),
          id: "username",
          name: "username",
          placeholder: "ID",
          required: true,
          style: styles.input,
        })
      ),
      React.createElement(
        "div",
        { style: styles.inputGroup },
        React.createElement("input", {
          type: "password",
          value: password,
          onChange: (e) => setPassword(e.target.value),
          id: "password",
          name: "password",
          placeholder: "password",
          required: true,
          style: styles.input,
        })
      ),
      React.createElement(
        "div",
        { style: styles.buttonGroup },
        React.createElement(
          "button",
          {
            onClick: handleLogin,
            style: styles.button,
            onMouseOver: (e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor),
            onMouseOut: (e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor),
          },
          "Login"
        ),
        React.createElement(
          "button",
          {
            type: "submit",
            style: styles.button,
            onClick: () => navigate("/signupscreen"),
            onMouseOver: (e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor),
            onMouseOut: (e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor),
          },
          "Signup"
        )
      )
    )
  );
};

export default LoginScreen;
