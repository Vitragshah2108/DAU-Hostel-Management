import React from 'react';
import Container from '@mui/material/Container';

const AuthLayout = ({ children }) => {
  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      {children}
    </Container>
  );
};

export default AuthLayout;


