import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import logo from '../assets/logo.svg';

const Navbar = ({ title = 'DAU Hostel', onMenuClick }) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
          <img src={logo} alt="Hostel" width={28} height={28} />
          <Typography variant="h6" component="div">{title}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
