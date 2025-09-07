import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * Loader
 * Simple centered spinner.
 * @param {boolean} fullScreen - whether to center on full screen height
 */
const Loader = ({ fullScreen = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullScreen ? '100vh' : '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;


