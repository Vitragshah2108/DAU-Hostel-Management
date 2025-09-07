import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StudentLayout from '../../layouts/StudentLayout';
import Loader from '../../components/Loader';
import Toast from '../../components/Toast';
import EventRegistrationForm from '../../components/EventRegistrationForm';
import eventService from '../../services/hostel-event.service';

/**
 * HostelEvents Page
 * Lists upcoming events and allows registration.
 */

const HostelEvents = () => {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await eventService.getHostelEvents();
      setItems(data);
    } catch (err) {
      Toast.error(err?.message || 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { load(); }, []);

  const confirm = async () => {
    try {
      await eventService.registerForEvent(selected.id);
      Toast.success('Registered for event');
      setSelected(null);
      load();
    } catch (err) {
      Toast.error(err?.message || 'Registration failed');
    }
  };

  return (
    <StudentLayout title="Hostel Events">
      {loading ? <Loader /> : (
        <>
          <Grid container spacing={2}>
            {items.map((e) => (
              <Grid key={e.id} item xs={12} md={6} lg={4}>
                <Card>
                  <CardHeader title={e.title} subheader={e.date} />
                  <CardContent>
                    <Typography variant="body2">Capacity: {e.capacity}</Typography>
                    <Button sx={{ mt: 1 }} variant="contained" onClick={() => setSelected(e)}>Register</Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <EventRegistrationForm open={!!selected} onClose={() => setSelected(null)} onSubmit={confirm} eventTitle={selected?.title} />
        </>
      )}
    </StudentLayout>
  );
};

export default HostelEvents;


