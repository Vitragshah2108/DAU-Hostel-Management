import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import complaintService from '../../services/complaint.service';

const ComplaintManagement = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [note, setNote] = React.useState('');

  const load = async () => {
    try {
      setLoading(true);
      const data = await complaintService.getAll();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load complaints');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { load(); }, []);

  const setStatus = async (id, status) => {
    try {
      await complaintService.updateStatus(id, status);
      Toast.success('Status updated');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Update failed');
    }
  };

  const addNote = async (id) => {
    try {
      await complaintService.addAdminNote(id, note);
      setNote('');
      Toast.success('Note added');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Add note failed');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <Card>
      <CardHeader title="Complaint Management" />
      <CardContent>
        <Grid container spacing={2}>
          {items.map((c) => (
            <Grid key={c._id || c.id} item xs={12} md={6} lg={4}>
              <Card sx={{ p: 2 }}>
                <div>Title: {c.title}</div>
                <div>Student: {c.student?.name || '-'}</div>
                <div>Status: {c.status}</div>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button size="small" onClick={() => setStatus(c._id || c.id, 'in_progress')}>In Progress</Button>
                  <Button size="small" onClick={() => setStatus(c._id || c.id, 'resolved')}>Resolved</Button>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <TextField size="small" label="Admin note" value={note} onChange={(e) => setNote(e.target.value)} />
                  <Button size="small" onClick={() => addNote(c._id || c.id)}>Add</Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ComplaintManagement;


