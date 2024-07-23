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

export default function Navbar_member() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: '12px' }}>
            
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
    </Box>
  );
}