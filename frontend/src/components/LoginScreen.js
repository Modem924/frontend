import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./api";

const LoginScreen = ({ setToken }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request...");
      console.log(id, password);
      const data = await login(id, password);
      console.log(data);
      const { accessToken } = data;
      localStorage.setItem("jwtToken", accessToken);
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
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
    },
    leftPanel: {
      flex: 1,
      backgroundColor: "#B3C7E6",
      padding: "50px",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    leftPanelContent: {
      maxWidth: "500px",
    },
    rightPanel: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    logo: {
      marginBottom: "20px",
      width:"50%",
      height:"50%",
      display: "block", // 추가된 부분
      marginLeft: "auto", // 추가된 부분
      marginRight: "auto", // 추가된 부분
    },
    heading: {
      textAlign: "center",
      marginBottom: "20px",
    },
    form: {
      width: "300px",
      textAlign: "center",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    input: {
      width: "calc(100% - 20px)", // Padding을 고려하여 너비 조정
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "3px",
      marginBottom: "10px",
      boxSizing: "border-box",
    },
    button: {
      width: "calc(100% - 20px)", // Padding을 고려하여 너비 조정
      padding: "10px",
      border: "none",
      borderRadius: "3px",
      backgroundColor: "#A1BBDE", // 버튼 색상 변경
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "10px",
      boxSizing: "border-box",
    },
    errorMessage: {
      color: "red",
    },
    leftPanelText: {
      fontSize: "16px",
      textAlign: "left",
    },
    leftPanelTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      //textAlign: "center",
      //color:"#0B368C",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <div style={styles.leftPanelContent}>
          <img
            src={`${process.env.PUBLIC_URL}/logo_.png`}
            alt="Logo"
            style={styles.logo}
          />
          <h1 style={styles.leftPanelTitle}>Business Resource Management</h1>
          <p style={styles.leftPanelText}>
          FAST 솔루션은 HRM과 CRM을 통합하여 사내 자원 관리의 모든 측면을 포괄하는 혁신적인 시스템입니다. 
          이 솔루션은 구성원의 근태 관리와 고객 관리 기능을 제공하여, 기업 내 자원을 총체적으로 관리하고 최적화된 운영을 가능하게 합니다. 
          이를 통해 효율적인 업무 수행과 전사적인 관리 체계를 실현하여 기업의 생산성과 경쟁력을 극대화할 수 있습니다.
          </p>
        </div>
      </div>
      <div style={styles.rightPanel}>
        <div style={styles.form}>
          <h2 style={styles.heading}>System Login</h2>
          <form>
            <div style={styles.inputGroup}>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                id="username"
                name="username"
                placeholder="ID"
                required
                style={styles.input}
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                placeholder="password"
                required
                style={styles.input}
              />
            </div>
            {error && <div style={styles.errorMessage}>{error}</div>}
            <button onClick={handleLogin} style={styles.button}>
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate("/signupscreen")}
              style={styles.button}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;