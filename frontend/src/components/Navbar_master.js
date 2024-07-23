import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const navItems = [
  { label: "Home", path: "/master" },
  { label: "Workers", path: "/workerscreen" },
  { label: "Upload", path: "/upload" },
  { label: "FaceDetection", path: "/face-detection" },
  { label: "Analyzer", path: "/analyze" },
  { label: "Service", path: "/service" },
  { label: "Attendance", path: "/attendance" },
];

export default function NavigationBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/logout">
            <ListItemText primary="로그아웃" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <CssBaseline />
      <AppBar component="nav" 
              sx={{ 
                  backgroundColor: '#FFFFFF', 
                  boxShadow: 'none', 
                  borderBottom: '1px solid #E0E0E0' 
                  }}>
        <Toolbar sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '0 16px', 
                  minHeight: '85px !important' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: '#000' }}
            >
              <MenuIcon />
            </IconButton>
            <img src={require('./../util/logo.png')} alt="Logo" style={{ width: "100px", marginLeft: '16px' }} />
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', flexGrow: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ color: '#333333', fontSize: '16px', fontWeight: 'bold', textTransform: 'none', margin: '0 12px' }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '12px' }}>
            
            <Button
                component={Link}
                to="/logout"
                sx={{ 
                  color: '#344889', 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  textTransform: 'none', 
                  backgroundColor: 'white', 
                  padding: '6px 12px', 
                  borderRadius: '8px', 
                  border: '1px solid #344889', 
                  '&:hover': { backgroundColor: '#e0e0e0' } 
                }}
              >
                직원관리
              </Button>
              <Button
                component={Link}
                to="/logout"
                sx={{ 
                  color: '#344889', 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  textTransform: 'none', 
                  backgroundColor: 'white', 
                  padding: '6px 12px', 
                  borderRadius: '8px', 
                  border: '1px solid #344889', 
                  '&:hover': { backgroundColor: '#e0e0e0' } 
                }}
              >
                고객관리
              </Button>
              <Button
                component={Link}
                to="/logout"
                sx={{ 
                  color: 'white', 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  textTransform: 'none', 
                  backgroundColor: '#344889', 
                  padding: '6px 12px', 
                  borderRadius: '8px', 
                  '&:hover': { backgroundColor: '#555555' } 
                }}
              >
                로그아웃
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}