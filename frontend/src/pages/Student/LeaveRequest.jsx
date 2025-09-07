import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import StudentLayout from '../../layouts/StudentLayout';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import leaveRequestService from '../../services/leave-request.service';

/**
 * LeaveRequest Page (optional)
 * Allows creating a leave/night-out request and lists past requests.
 */

const LeaveRequest = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [form, setForm] = React.useState({ from: '', to: '', reason: '' });
  const [submitting, setSubmitting] = React.useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await leaveRequestService.getMyRequests();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []);

  const submit = async () => {
    try {
      setSubmitting(true);
      await leaveRequestService.createRequest(form);
      Toast.success('Leave request submitted');
      setForm({ from: '', to: '', reason: '' });
      load();
    } catch (err) {
      Toast.error(err?.message || 'Submit failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StudentLayout title="Leave Request">
      {loading ? <Loader /> : (
        <>
          <Card sx={{ mb: 2 }}>
            <CardHeader title="New Request" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField type="date" label="From" InputLabelProps={{ shrink: true }} value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} fullWidth />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField type="date" label="To" InputLabelProps={{ shrink: true }} value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} fullWidth />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField label="Reason" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} fullWidth />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={submit} disabled={submitting}>Submit</Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="My Requests" />
            <CardContent>
              <Grid container spacing={2}>
                {items.map((r) => (
                  <Grid key={r.id} item xs={12} md={6} lg={4}>
                    <Card sx={{ p: 2 }}>
                      <div>From: {r.from}</div>
                      <div>To: {r.to}</div>
                      <div>Reason: {r.reason}</div>
                      <div>Status: {r.status}</div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </>
      )}
    </StudentLayout>
  );
};

export default LeaveRequest;


