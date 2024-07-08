import { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

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
    const [searchInput, setSearchInput] = useState('');
    const searchItems = () => {
    }

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
                                onChange={() => searchItems()}
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
        </div>
    );
}

export default ServiceScreen;
