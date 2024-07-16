import { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const filters = [
    {
        value: 'All',
        label: 'All',
    },
    {
        value: 'Mon',
        label: 'Monday',
    },
    {
        value: 'Tue',
        label: 'Tuesday',
    },
    {
        value: 'Wed',
        label: 'Wednesday',
    },
    {
        value: 'My',
        label: 'My Class',
    },
];

const ServiceScreen = () => {
    const [APIData, setAPIData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then((response) => {
                setAPIData(response.data);
            });
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(APIData);
        }
    };

    return (
        <div>
            <NavigationBar />
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={6} md={4}>
                        <Box
                            display="flex"
                            alignItems="center"
                            sx={{
                                width: 500,
                                maxWidth: '100%',
                            }}
                        >
                            <TextField
                                label='Search'
                                onChange={(e) => searchItems(e.target.value)}
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6} md={2}>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="filters"
                                select
                                label="Select"
                                defaultValue="All"
                            >
                                {filters.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ width: '100%', margin: '0 auto' }}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: '90%', margin: '0 auto', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                수업1
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                교사1
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small">Button</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: '90%', margin: '0 auto', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                수업2
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                교사1
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small">Button</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: '90%', margin: '0 auto', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                수업3
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                교사1
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small">Button</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: '90%', margin: '0 auto', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                수업1
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                교사1
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small">Button</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: '90%', margin: '0 auto', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                수업2
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                교사1
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small">Button</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: '90%', margin: '0 auto', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                수업3
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                교사1
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'center' }}>
                            <Button size="small">Button</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

export default ServiceScreen;
