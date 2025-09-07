import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import notificationService from '../../services/notification.service';

const Announcements = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [form, setForm] = React.useState({ title: '', message: '', target: 'all' });

  const load = async () => {
    try {
      setLoading(true);
      const data = await notificationService.getAll();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => { load(); }, []);

  const create = async () => {
    try {
      await notificationService.create(form);
      Toast.success('Announcement created');
      setForm({ title: '', message: '', target: 'all' });
      load();
    } catch (err) {
      Toast.error(err?.message || 'Create failed');
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <>
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Create Announcement" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}><TextField label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} fullWidth /></Grid>
            <Grid item xs={12} md={6}><TextField label="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} fullWidth /></Grid>
            <Grid item xs={12} md={3}><TextField label="Target" value={form.target} onChange={(e) => setForm({ ...form, target: e.target.value })} fullWidth /></Grid>
            <Grid item xs={12}><Button variant="contained" onClick={create}>Publish</Button></Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Announcements" />
        <CardContent>
          {items.map((n) => (
            <div key={n._id || n.id} style={{ padding: 8, borderBottom: '1px solid #eee' }}>{n.title || ''} - {n.message}</div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Announcements;


