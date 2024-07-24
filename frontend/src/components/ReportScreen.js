import React, { useEffect, useState } from 'react';
import { getMemberDetails, deleteUser } from './api';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typewriter from 'typewriter-effect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import reportIcon from '../util/report_gray.png';
import deleteIcon from '../util/delete_gray.png';
import axios from 'axios';
import { ReactTyped as Typed } from 'react-typed';
import styled from 'styled-components';

export default function ReportScreen() {
    const { userPK } = useParams();
    const [userData, setUserData] = useState(null);
    const [showTypewriter, setShowTypewriter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

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

    useEffect(() => {
        console.log('Fetching data for userPK:', userPK);
        getMemberDetails(userPK)
            .then(data => {
                console.log("call data: ", data);
                setUserData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching member details:', error);
                setLoading(false);
            });
    }, [userPK]);

    const handleDelete = () => {
        if (userData?.username) {
            deleteUser(userData.username)
                .then(() => {
                    setSnackbarMessage('User deleted successfully');
                    setSnackbarOpen(true);
                    setUserData(null); // Clear user data after deletion
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    setSnackbarMessage('Error deleting user');
                    setSnackbarOpen(true);
                });
        }
    };

    const handleReport = () => {
        setShowTypewriter(true);
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
                        label="유저이름"
                        defaultValue={userData?.username || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="nickname_input"
                        label="성함"
                        defaultValue={userData?.userNickname || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="phone_number_input"
                        label="개인전화번호"
                        defaultValue={userData?.userPhoneNumber || ''}
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                    />
                    <TextField
                        id="address_input"
                        label="주소"
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

    const Result = styled.div`
        background-color: #DAE6F4;
        padding: 30px;
        border-radius: 8px;
        border: 1px solid #c5e1a5;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
        white-space: pre-wrap;
        word-wrap: break-word;
    `;

    const Loader = styled.div`
        border: 4px solid #f3f3f3;
        border-radius: 50%;
        border-top: 4px solid #00796b;
        width: 24px;
        height: 24px;
        animation: spin 1s linear infinite;
        display: inline-block;

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;

    return (
        <>
            <ThemeProvider theme={theme}>
                <div style={styles.board}>
                    <div style={styles.section}>
                        <TypoTitle input_text="INFO" />
                        <div style={styles.section_in_info}>
                            <div style={styles.section_form}>
                                <FormEx />
                            </div>
                        </div>
                        <div style={styles.section_in_button}>
                            <Button variant="contained" color="skyblue" startIcon={<img src={deleteIcon} alt="icon" style={{ width: 24, height: 24 }} />} sx={{ color: 'white', margin: "3px" }} onClick={handleDelete}>DELETE</Button>
                            <Button variant="contained" color="skyblue" onClick={handleReport} startIcon={<img src={reportIcon} alt="icon" style={{ width: 24, height: 24 }} />} sx={{ color: 'white', margin: "3px" }}>REPORT</Button>
                        </div>
                    </div>
                    <div style={styles.section}>
                        <TypoTitle input_text={userData?.username + " 님의 Report"} />
                        <div>
                            {loading && <Loader />}
                            {showTypewriter && userData?.hcReport && !loading && (
                                <Result>
                                    <Typed
                                        strings={[userData.hcReport]}
                                        typeSpeed={30}
                                    />
                                </Result>
                            )}
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}
