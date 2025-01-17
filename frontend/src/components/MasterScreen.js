import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { BarChart } from '@mui/x-charts/BarChart';
import { getMasterMain } from './api';
import Box from '@mui/material/Box';

const MasterScreen = () => {
  const [masterData, setMasterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMasterMain()
      .then((data) => {
        setMasterData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching master main data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .hiddenLabels text {
        display: none !important;
      }
      .MuiChartLegend-root {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
    mainPage: {
      margin: "0 auto",
      width: "1200px",
      justifyContent: 'center',
    },
    dashboard: {
      display: "grid",
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
      overflow: "hidden",
      width: "100%",
      justifyContent: "center",
    },
    section_in: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      display: "flex",
      boxSizing: "border-box",
      padding: "30px",
      overflow: "hidden",
    },
    section_in_profit: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      display: "flex",
      boxSizing: "border-box",
    },
    section_coursePerformance: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxSizing: "border-box",
      overflow: "hidden",
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
      display: "flex",
      padding: "20px",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "18px",
      color: "#333",
      fontFamily: "Anton SC, sans-serif",
    },
    pieChartContainer: {
      display: "flex",
      alignItems: "center",
      width: "100%",
    },
    pieChart: {
      width: "70%",
      height: "auto",
    },
    legendContainer: {
      width: "40%",
      maxHeight: "250px",
      overflowY: "auto",
      paddingLeft: "20px",
    },
    legend: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    legendItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
    },
    legendColorBox: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
    },
  };

  const chartSetting = {
    xAxis: [
      {
        label: 'Revenue (₩)',
      },
    ],
    width: 700,
    height: 400,
  };

  function BarChartComponent() {
    if (loading || !masterData) {
      return <p>Loading...</p>;
    }

    const months = [
      "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06",
      "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12"
    ];
    
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }


    const data = months.map(month => {
      const monthData = masterData.monthlyEduRevenueList.find(item => item.month === month);
      return {
        month,
        revenue: monthData ? monthData.revenue : 0
      };
    });

    const dataset = data.map(item => ({
      month: item.month,
      revenue: item.revenue,
    }));

    const valueFormatter = (value) => `${value}₩`;

    return (
      <BarChart
        dataset={dataset}
        xAxis={[{ label: 'Month', scaleType: 'band', dataKey: 'month', 
        colorMap: {type: 'ordinal', colors: ['#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#08589e']}}]}
        yAxis={[{ dataKey: 'revenue' }]}
        series={[{ dataKey: 'revenue', valueFormatter, }]}
        layout="vertical"
        width={1000}
        height={400}
      />
    );
  }

  function CoursePerformance() {
    if (loading || !masterData) {
      return <p>Loading...</p>;
    }

    const columns = [
      { field: "id", headerName: "ID", width: 80 },
      {
        field: "eduName",
        headerName: "Class Name",
        width: 150,
        editable: true,
      },
      {
        field: "totalRevenue",
        headerName: "Revenue",
        width: 150,
        editable: true,
      },
      {
        field: "studentCount",
        headerName: "Students",
        type: "number",
        width: 80,
        editable: true,
      },
    ];

    const rows = masterData.eduRevenueList.map((edu, index) => ({
      id: index + 1,
      eduName: edu.eduName,
      totalRevenue: edu.totalRevenue,
      studentCount: edu.studentCount,
    }));

    return (
      <Box sx={{ height: 400, width: 500 }}>
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
    if (loading || !masterData) {
      return <p>Loading...</p>;
    }

    const months = [
      "2024-01", "2024-02", "2024-03", "2024-04", "2024-05", "2024-06",
      "2024-07", "2024-08", "2024-09", "2024-10", "2024-11", "2024-12"
    ];

    const data = months.map(month => {
      const monthData = masterData.monthlyRegistrationList.find(item => item.month === month);
      return {
        month,
        count: monthData ? monthData.registrationCount : 0
      };
    });

    const dataset = data.map(item => ({
      month: item.month,
      count: item.count,
    }));

    return (
      <LineChart
        dataset={dataset}
        series={[
          { dataKey: 'count', label: 'Registration Count', color: "#96B3D9" },
        ]}
        xAxis={[{ scaleType: "point", dataKey: 'month' }]}
        width={600}
        height={400}
      />
    );
  }

  function PieEx() {
    if (loading || !masterData) {
      return <p>Loading...</p>;
    }

    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    const data = masterData.eduRevenueList.map((edu, index) => ({
      id: index,
      value: edu.studentCount,
      label: edu.eduName,
      color: getRandomColor(),
    }));

    return (
      <div style={styles.pieChartContainer}>
        <div style={styles.pieChart}>
          <PieChart
            className="hiddenLabels"
            series={[
              {
                data,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: { innerRadius: 30, additionalRadius: -30, color: "#D5E2F2" },
              },
            ]}
            height={300}
            slotProps={{ legend: { hidden: true } }}
          />
        </div>
        <div style={styles.legendContainer}>
          <div style={styles.legend}>
            {data.map((item) => (
              <div key={item.id} style={styles.legendItem}>
                <div style={{ ...styles.legendColorBox, backgroundColor: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function TypoTitle({ input_text }) {
    const theme = useTheme();
    const localTheme = createTheme({
      typography: {
        h7: {
          fontSize: "14px",
          "@media (min-width:600px)": {
            fontSize: "1.5rem",
          },
          [theme.breakpoints.up("md")]: {
            fontSize: "2rem",
          },
        },
      },
    });

    return (
      <ThemeProvider theme={localTheme}>
        <Typography variant="h6">{input_text}</Typography>
      </ThemeProvider>
    );
  }

  return (
    <>
      <div style={styles.mainPage}>
        <div style={styles.dashboard}>
          <div style={styles.section}>
            <div style={{
              display: 'inline-block',
              backgroundColor: "#DAE6F4",
              borderRadius: "8px",
              padding: "10px 20px",
            }}>
              <TypoTitle input_text={"등록 고객"} />
            </div>
            <div style={styles.registerSection}>
              <div style={styles.section_in_classLine}>
                <ClassLine />
              </div>
            </div>
          </div>
          <div style={styles.section}>
            <div style={{
              display: 'inline-block',
              backgroundColor: "#DAE6F4",
              borderRadius: "8px",
              padding: "10px 20px",
            }}>
              <TypoTitle input_text={"클래스 비율"} />
            </div>
            <div style={styles.section_in}>
              <PieEx />
            </div>
          </div>
          <div style={styles.section_coursePerformance}>
            <div style={{
              display: 'inline-block',
              backgroundColor: "#DAE6F4",
              borderRadius: "8px",
              padding: "10px 20px",
            }}>
              <TypoTitle input_text={"수익 차트"} />
            </div>
            <div style={styles.section_in_profit}>
              <BarChartComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MasterScreen;