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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getService, addService } from './api';

const filters = [
    { value: 'All', label: 'All' },
    { value: 'Mon', label: 'Monday' },
    { value: 'Tue', label: 'Tuesday' },
    { value: 'Wed', label: 'Wednesday' },
    { value: 'My', label: 'My Class' },
];

const ServiceScreen = () => {
    const [APIData, setAPIData] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        eduName: '',
        eduDay: '',
        eduStart: '',
        eduEnd: '',
    });

    useEffect(() => {
        getService()
            .then((data) => {
                setAPIData(data);
                setFilteredResults(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const { eduName, eduDay, eduStart, eduEnd } = formData;
            const response = await addService(eduName, eduDay, eduStart, eduEnd);
            console.log('POST 성공:', response);

            // 새로운 데이터를 추가 후, getService를 호출하여 데이터 갱신
            const updatedData = await getService();
            setAPIData(updatedData);
            setFilteredResults(updatedData);

            handleClose();
        } catch (error) {
            console.error('POST 요청 실패:', error);
        }
    };

    return (
        <div>
            <NavigationBar />
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={6} md={4}>
                        <Box display="flex" alignItems="center" sx={{ width: 500, maxWidth: '100%' }}>
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
                                onChange={(e) => searchItems(e.target.value)}
                            >
                                {filters.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <Button variant="contained" onClick={handleClickOpen}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ width: '100%', margin: '0 auto' }}>
                {(filteredResults.length > 0 ? filteredResults : APIData).map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ maxWidth: '90%', margin: '0 auto', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                                    {item.eduName}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {item.eduDay}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'center' }}>
                                <Button size="small">Button</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Service</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="eduName"
                        label="eduName"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="eduDay"
                        label="eduDay"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="eduStart"
                        label="eduStart"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="eduEnd"
                        label="eduEnd"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>Add</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ServiceScreen;
