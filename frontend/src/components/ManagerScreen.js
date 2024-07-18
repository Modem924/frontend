import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";
//import { BarChart } from "@mui/x-charts/BarChart";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const ManagerScreen = () => {
  const theme = createTheme({
    palette: {
      skyblue: {
        main: "#A1BBDE",
        light: "#DAE6F4",
        dark: "#344889",
        constrastText: "#F2F2F2",
      },
    },
  });
  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
    },

    dashboard: {
      display: "grid",
      //gridTemplateColumns: "repeat(auto-fit, minmax(45%, 1fr))",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      backgroundColor: "#F2F4F8",
      gridColumn: "1/3",
      gridRow: "2/3",
      margin: "0 auto",
      width: "1200px",
    },
    section: {
      backgroundColor: "#fff",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      boxSizing: "border-box",
      overflow: "hidden", // 내용이 넘칠 경우 숨기기
      width: "100%",
      //display: "flex",
      justifyContent: "center",
    },
    section_in: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      display: "flex",
      boxSizing: "border-box",
      //overflow: "hidden", // 내용이 넘칠 경우 숨기기
    },
    section_coursePerformance: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxSizing: "border-box",
      overflow: "hidden", // 내용이 넘칠 경우 숨기기
      gridColumn: "1/3",
      gridRow: "2/3",
    },
    section_in_course: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
    },

    section_in_classList: {
      padding: "20px",
    },
    section_in_classLine: {
      padding: "20px",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "18px",
      color: "#333",
    },
    pieChart: {
      width: "100%",
      height: "auto",
    },
  };

  function NavigationBar() {
    const navItems = [
      { label: "관리자메인화면", path: "/master" },
      { label: "전체일정관리화면", path: "/service_list" },
      { label: "직원관리화면", path: "/worker_manage" },
      { label: "Logout", path: "/" },
    ];
    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav" sx={{ backgroundColor: "white" }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
              <img
                src={require("./../util/logo.png")}
                alt="Logo"
                style={{ width: "200px" }}
              />
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{ color: "black" }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    );
  }
  function BarChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMetric, setSelectedMetric] = useState("revenue");

    useEffect(() => {
      // 목 데이터를 사용
      const mockData = [
        { month: "January", revenue: 5000, students: 50 },
        { month: "February", revenue: 3000, students: 30 },
        { month: "March", revenue: 4000, students: 40 },
        { month: "April", revenue: 4500, students: 35 },
        { month: "May", revenue: 6000, students: 55 },
        { month: "June", revenue: 7000, students: 60 },
        { month: "July", revenue: 8000, students: 70 },
        { month: "August", revenue: 7500, students: 65 },
        { month: "September", revenue: 6200, students: 50 },
        { month: "October", revenue: 5300, students: 45 },
        { month: "November", revenue: 4900, students: 40 },
        { month: "December", revenue: 5100, students: 42 },
      ];
      //여기를 get api로 바꾸면 됨

      setData(mockData);
      setLoading(false);
    }, []);

    const chartData = {
      labels: data.map((item) => item.month),
      datasets: [
        {
          label: selectedMetric === "revenue" ? "Revenue" : "Students",
          data: data.map((item) =>
            selectedMetric === "revenue" ? item.revenue : item.students
          ),
          backgroundColor:
            selectedMetric === "revenue"
              ? "rgba(75, 192, 192, 0.6)"
              : "rgba(153, 102, 255, 0.6)",
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.dropdownContainer}>
          <label htmlFor="metric-select">Select Metric: </label>
          <select
            id="metric-select"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            style={styles.dropdown}
          >
            <option value="revenue">매출액</option>
            <option value="students">등록 학생 수</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>
    );
  }

  const BarchartStyles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f0f0f0",
      padding: "10px",
    },
    dropdownContainer: {
      marginBottom: "10px",
    },
    dropdown: {
      padding: "10px",
      fontSize: "16px",
    },
  };

  function CoursePerformance() {
    const columns = [
      { field: "id", headerName: "ID", width: 80 },
      {
        field: "className",
        headerName: "Class Name",
        width: 150,
        editable: true,
      },
      {
        field: "instructor",
        headerName: "Instructor",
        width: 150,
        editable: true,
      },
      {
        field: "numOfStudent",
        headerName: "Students",
        type: "number",
        width: 80,
        editable: true,
      },
      {
        field: "avgScore",
        headerName: "Score(Avg)",
        type: "number",
        width: 100,
        editable: true,
      },
    ];

    const rows = [
      {
        id: 1,
        className: "RC_inter",
        instructor: "Walter White",
        numOfStudent: 33,
        avgScore: 100,
      },
      {
        id: 2,
        className: "RC_junior",
        instructor: "Kim Wexler",
        numOfStudent: 54,
        avgScore: 100,
      },
      {
        id: 3,
        className: "LC_master",
        instructor: "Jessie Pinkman",
        numOfStudent: 15,
        avgScore: 100,
      },
      {
        id: 4,
        className: "LC_basic",
        instructor: "Soul Goodman",
        numOfStudent: 28,
        avgScore: 100,
      },
      {
        id: 5,
        className: "RC_inter",
        instructor: "Walter White",
        numOfStudent: 33,
        avgScore: 100,
      },
    ];
    return (
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    );
  }

  function ClassLine() {
    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
    const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
    const xLabels = ["1월", "2월", "3월", "4월", "5월", "6월", "7월"];
    return (
      <LineChart
        width={550}
        height={450}
        series={[
          { data: pData, label: "pv", color: "#344889" },
          { data: uData, label: "uv", color: "#96B3D9" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    );
  }

  function PieEx() {
    const data = [
      { id: 0, value: 10, label: "Class A", color: "#96B3D9" },
      { id: 1, value: 15, label: "Class B", color: "#B4C4D9" },
      { id: 2, value: 20, label: "Class C", color: "#344889" },
      { id: 3, value: 30, label: "Class D", color: "red" },
    ];
    return (
      <PieChart
        series={[
          {
            data,
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "#D5E2F2" },
          },
        ]}
        height={200}
      />
    );
  }

  function TypoTitle({ input_text }) {
    theme.typography.h3 = {
      fontSize: "1.2rem",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
      [theme.breakpoints.up("md")]: {
        fontSize: "2rem",
      },
    };
    return (
      <ThemeProvider theme={theme}>
        <Typography variant="h6">{input_text}</Typography>
      </ThemeProvider>
    );
  }

  return (
    <>
      <NavigationBar />
      <div style={styles.dashboard}>
        <div style={styles.section}>
          <TypoTitle input_text={"NET PROFIT"} />
          <div style={styles.section_in}>
            <BarChart />
          </div>
        </div>
        <div style={styles.section}>
          <TypoTitle input_text={"STUDENTS RATE"} />
          <div style={styles.section_in}>
            <PieEx />
          </div>
        </div>
        <div style={styles.section_coursePerformance}>
          <TypoTitle input_text={"COURSE PERFORMANCE"} />
          <div style={styles.section_in_course}>
            <div style={styles.section_in_classList}>
              <CoursePerformance />
            </div>
            <div style={styles.section_in_classLine}>
              <ClassLine />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default ManagerScreen;
