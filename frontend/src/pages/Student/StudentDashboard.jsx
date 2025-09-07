import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import DashboardCard from '../../components/DashboardCard';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import dashboardService from '../../services/dashboard.service';

/**
 * StudentDashboard
 * Shows student overview stats and quick actions.
 */

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [summary, setSummary] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await dashboardService.getStudentSummary();
        setSummary(data);
      } catch (err) {
        Toast.error(err?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <StudentLayout title="Student Dashboard">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Room Status" value={summary?.roomStatus || '-'} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Fees Due" value={`₹ ${summary?.feesDue ?? 0}`} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Upcoming Events" value={summary?.upcomingEvents ?? 0} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Pending Complaints" value={summary?.pendingComplaints ?? 0} />
            </Grid>
          </Grid>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" onClick={() => navigate('/student/rooms')}>Room Selection</Button>
            <Button variant="outlined" onClick={() => navigate('/student/fees')}>Fees</Button>
            <Button variant="outlined" onClick={() => navigate('/student/complaints')}>Complaints</Button>
          </Stack>
        </>
      )}
    </StudentLayout>
  );
};

export default StudentDashboard;


