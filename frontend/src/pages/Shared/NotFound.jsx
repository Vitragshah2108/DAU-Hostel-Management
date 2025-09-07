import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

/**
 * NotFound Page
 * Minimal 404 page with a button to go back to dashboard.
 */
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', gap: 2, p: 2 }}>
      <Typography variant="h4">Page Not Found</Typography>
      <Typography variant="body2" color="text.secondary">The page you are looking for does not exist.</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>Go to Dashboard</Button>
    </Box>
  );
};

export default NotFound;


