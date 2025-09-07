import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#004aad' },
    secondary: { main: '#00bcd4' },
    success: { main: '#2e7d32' },
    error: { main: '#c62828' },
    warning: { main: '#ed6c02' },
    info: { main: '#0288d1' },
    background: { default: '#f7f9fc' },
  },
  shape: { borderRadius: 8 },
});

export default theme;


