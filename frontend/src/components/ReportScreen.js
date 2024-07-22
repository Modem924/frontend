import React, { useEffect, useState } from 'react';
import { getMemberDetails } from './api';
import { Link, useParams } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typewriter from 'typewriter-effect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Gauge } from '@mui/x-charts/Gauge';
import { CopyToClipboard } from "react-copy-to-clipboard";
import clipBoardIcon from '../util/clipboard_gray.png';
import reportIcon from '../util/report_gray.png';
import updateIcon from '../util/update_gray.png';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';

export default function ReportScreen() {
    const { userPK } = useParams();
    const [userData, setUserData] = useState(null);
    const [showTypewriter, setShowTypewriter] = useState(false);
    const [loading, setLoading] = useState(true);

    const theme = createTheme({
        palette: {
            skyblue: {
                main: '#A1BBDE',
                light: '#DAE6F4',
                dark: '#344889',
                contrastText: '#F2F2F2',
            }
        }
    });

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        console.log('Fetching data for userPK:', userPK);
        getMemberDetails(userPK)
            .then(response => {
                setUserData(response.data.meminfo);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching member details:', error);
                setLoading(false);
            });
    }, [userPK]);

    const handleClick = () => {
        setShowTypewriter(true);
    };

    const TypewriterEx = () => (
        <Typewriter
            options={{
                strings: [temp_report],
                deleteSpeed: Infinity,
                autoStart: true,
                loop: false,
                deleteAll: 0,
                delay: 10,
            }}
        />
    );

    const temp_report = 
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.\
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, \
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. \
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. \
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,\
        ";

    const student_attendance = {
        class_day: 365,
        absence: 30,
    };

    const styles = {
        board: {
            margin: "0 auto",
            width: "1200px",
        },
        section: {
            padding: "20px",
            margin: "20px",
            backgroundColor: "#ffffff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            boxSizing: "border-box",
        },
        section_in_info: {
            display: "flex",
        },
        section_form: {
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxSizing: "border-box",
            margin: "0 auto",
        },
        section_pie: {
            // Styles for pie chart can go here
        },
        section_in: {
            display: "flex",
            justifyContent: "center",
        },
        section_in_report: {
            padding: "20px",
            margin: "15px",
            backgroundColor: "#F5FAFF",
            height: "300px",
            width: "1000px",
            borderRadius: "8px",
        },
        section_in_btn: {
            padding: "20px",
            margin: "15px",
        },
        section_in_button: {
            padding: "20px",
            textAlign: "right",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "right",
        }
    };

    const navItemReport = [
        { label: 'Report', path: '/report' },
        { label: 'Logout', path: '/' },
    ];

    function NavigationBar() {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar component="nav" sx={{ backgroundColor: 'white' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                            <img src={require('./../util/logo.png')} alt="Logo" style={{ width: "200px" }} />
                        </Box>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItemReport.map((item) => (
                                <Button
                                    key={item.label}
                                    component={Link}
                                    to={item.path}
                                    sx={{ color: 'black' }}
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

    function TypoTitle({ input_text }) {
        theme.typography.h3 = {
            fontSize: '1.2rem',
            '@media (min-width:600px)': {
                fontSize: '1.5rem',
            },
            [theme.breakpoints.up('md')]: {
                fontSize: '2rem',
            },
        };
        return (
            <ThemeProvider theme={theme}>
                <Typography variant="h6">{input_text}</Typography>
            </ThemeProvider>
        );
    }

    function FormEx() {
        return (
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        id="name_input"
                        label="Username"
                        defaultValue={userData?.username || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="phone_number_input"
                        label="Phone"
                        defaultValue={userData?.userPhoneNumber || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="address_input"
                        label="Address"
                        defaultValue={userData?.userAddress || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                </div>
            </Box>
        );
    }

    function CLIP() {
        const cliped = temp_report;
        return (
            <CopyToClipboard text={cliped} onCopy={() => alert('복사를 완료했습니다.')}>
                <Button variant="contained" color={"skyblue"} startIcon={<img src={clipBoardIcon} alt="icon" style={{ width: 24, height: 24 }} />} sx={{ color: 'white' }}>
                    CLIPBOARD
                </Button>
            </CopyToClipboard>
        );
    }

    function Attchart() {
        var attend = student_attendance.class_day - student_attendance.absence;
        const rate = (attend / student_attendance.class_day) * 100;
        return (
            <Gauge width={100} height={100} value={rate} />
        );
    }

    function CircularIndeterminate() {
        return (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (loading) {
        return <CircularIndeterminate />;
    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <NavigationBar />
                <div style={styles.board}>
                    <div style={styles.section}>
                        <TypoTitle input_text="INFO" />
                        <div style={styles.section_in_info}>
                            <div style={styles.section_form}>
                                <FormEx />
                            </div>
                            <div style={styles.section_pie}>
                                {/* Pie chart or other content can go here */}
                            </div>
                        </div>
                        <div style={styles.section_in_button}>
                            <Button variant="contained" color={"skyblue"} startIcon={<img src={updateIcon} alt="icon" style={{ width: 24, height: 24 }} />} sx={{ color: 'white', margin: "3px" }}>UPDATE</Button>
                            <Button variant="contained" color={"skyblue"} onClick={handleClick} startIcon={<img src={reportIcon} alt="icon" style={{ width: 24, height: 24 }} />} sx={{ color: 'white', margin: "3px" }}>REPORT</Button>
                        </div>
                    </div>
                    <div style={styles.section}>
                        {/* Additional content can go here */}
                    </div>
                    <div style={styles.section}>
                        <TypoTitle input_text={userData?.username + " 님의 Report"} />
                        <div style={styles.section_in}>
                            <div style={styles.section_in_report}>
                                <p>content of report</p>
                                {showTypewriter && <TypewriterEx />}
                            </div>
                        </div>
                        <div style={styles.section_in_button}>
                            <CLIP />
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
