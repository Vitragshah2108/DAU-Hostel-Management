import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import eventService from '../../services/event.service';
import eventSchema from '../../validations/event.validation';
import { formatDate } from '../../utils/formatDate';

const HostelEventManagement = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [form, setForm] = React.useState({ title: '', description: '', date: '', capacity: 10 });

  const load = async () => {
    try {
      setLoading(true);
      const data = await eventService.getAll();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      await eventSchema.validate(form, { abortEarly: false });
      await eventService.create(form);
      Toast.success('Event created');
      setForm({ title: '', description: '', date: '', capacity: 10 });
      load();
    } catch (err) {
      const msg = err?.errors?.join(', ') || err?.message || 'Create failed';
      Toast.error(msg);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Create Event" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}><TextField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth /></Grid>
            <Grid item xs={12} md={3}><TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth /></Grid>
            <Grid item xs={12} md={3}><TextField type="date" label="Date" InputLabelProps={{ shrink: true }} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} fullWidth /></Grid>
            <Grid item xs={12} md={3}><TextField type="number" label="Capacity" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: Number(e.target.value) })} fullWidth /></Grid>
            <Grid item xs={12}><Button variant="contained" onClick={create}>Create</Button></Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Events" />
        <CardContent>
          {items.map((e) => (
            <div key={e._id || e.id} style={{ padding: 8, borderBottom: '1px solid #eee' }}>{e.title} - {formatDate(e.date)}</div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default HostelEventManagement;


