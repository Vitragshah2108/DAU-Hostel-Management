import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const DashboardCard = ({ title, value, icon, color = 'primary' }) => {
  return (
    <Card sx={{ minWidth: 200, backgroundColor: `${color}.light`, mb: 2 }}>
      <CardContent>
        {icon && <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>}
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
