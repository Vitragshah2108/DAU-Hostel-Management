import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import roomService from '../../services/room.service';

const RoomManagement = () => {
  const [loading, setLoading] = React.useState(true);
  const [rooms, setRooms] = React.useState([]);
  const [form, setForm] = React.useState({ roomNumber: '', wing: '', capacity: 1, status: 'available' });

  const load = async () => {
    try {
      setLoading(true);
      const data = await roomService.getAll();
      setRooms(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load rooms');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      await roomService.create(form);
      Toast.success('Room created');
      setForm({ roomNumber: '', wing: '', capacity: 1, status: 'available' });
      load();
    } catch (err) {
      Toast.error(err?.message || 'Create failed');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await roomService.updateStatus(id, status);
      Toast.success('Status updated');
      load();
    } catch (err) {
      Toast.error(err?.message || 'Update failed');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Create Room" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}><TextField label="Room Number" value={form.roomNumber} onChange={(e) => setForm({ ...form, roomNumber: e.target.value })} fullWidth /></Grid>
            <Grid item xs={12} md={3}><TextField label="Wing" value={form.wing} onChange={(e) => setForm({ ...form, wing: e.target.value })} fullWidth /></Grid>
            <Grid item xs={12} md={3}><TextField type="number" label="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} fullWidth /></Grid>
            <Grid item xs={12} md={3}>
              <TextField select label="Status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} fullWidth>
                <MenuItem value="available">available</MenuItem>
                <MenuItem value="pending">pending</MenuItem>
                <MenuItem value="allocated">allocated</MenuItem>
                <MenuItem value="maintenance">maintenance</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}><Button variant="contained" onClick={create}>Create</Button></Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Rooms" />
        <CardContent>
          <Grid container spacing={2}>
            {rooms.map((r) => (
              <Grid key={r.id || r._id} item xs={12} md={6} lg={4}>
                <Card sx={{ p: 2 }}>
                  <div>Room: {r.roomNumber}</div>
                  <div>Wing: {r.wing}</div>
                  <div>Status: {r.status}</div>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Button size="small" onClick={() => updateStatus(r._id || r.id, 'available')}>Mark Available</Button>
                    <Button size="small" onClick={() => updateStatus(r._id || r.id, 'maintenance')}>Maintenance</Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default RoomManagement;


