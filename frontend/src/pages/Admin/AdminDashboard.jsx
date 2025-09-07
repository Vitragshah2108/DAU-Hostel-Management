import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../components/DashboardCard';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import adminService from '../../services/admin.service';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardStats();
        setStats(data);
      } catch (err) {
        Toast.error(err?.message || 'Failed to load admin stats');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}><DashboardCard title="Total Rooms" value={stats?.totalRooms ?? 0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><DashboardCard title="Occupancy %" value={`${stats?.occupancyPercent ?? 0}%`} /></Grid>
        <Grid item xs={12} sm={6} md={3}><DashboardCard title="Pending Requests" value={stats?.pendingRoomRequests ?? 0} /></Grid>
        <Grid item xs={12} sm={6} md={3}><DashboardCard title="Unresolved Complaints" value={stats?.unresolvedComplaints ?? 0} /></Grid>
      </Grid>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" onClick={() => navigate('/admin/rooms')}>Manage Rooms</Button>
        <Button variant="outlined" onClick={() => navigate('/admin/room-requests')}>Room Requests</Button>
        <Button variant="outlined" onClick={() => navigate('/admin/complaints')}>Complaints</Button>
        <Button variant="outlined" onClick={() => navigate('/admin/fees')}>Fees</Button>
      </Stack>
    </>
  );
};

export default AdminDashboard;


