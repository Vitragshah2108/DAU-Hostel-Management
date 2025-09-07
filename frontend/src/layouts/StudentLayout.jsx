import React from 'react';
import Container from '@mui/material/Container';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const StudentLayout = ({ title, children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Navbar title={title} />
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {children}
        </Container>
      </div>
    </div>
  );
};

export default StudentLayout;


